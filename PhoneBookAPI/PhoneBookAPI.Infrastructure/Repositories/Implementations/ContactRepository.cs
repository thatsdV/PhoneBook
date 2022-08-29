using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;
using PhoneBookAPI.Infrastructure.Repositories.DAO;
using PhoneBookAPI.Utils.Files;
using System.Transactions;

namespace PhoneBookAPI.Infrastructure.Repositories.Implementations
{
    public class ContactRepository : BaseRepository<ContactDAO>, IContactRepository
    {
        private readonly IMapper _mapper;
        private readonly IFileManager _fileManager;
        private readonly IContactNumberRepository _contactNumberRepository;

        public ContactRepository(IMapper mapper, IConfiguration configuration, 
            IContactNumberRepository contactNumberRepository, IFileManager fileManager) : base(mapper, configuration)
        {
            _mapper = mapper;
            _contactNumberRepository = contactNumberRepository;
            _fileManager = fileManager;
        }

        public async Task<int?> InsertContact(CreateContactInput input)
        {
            using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var contact = _mapper.Map<ContactDAO>(input);

                var contactId = (int?)await InsertAsync<ContactDAO>(contact);

                if (contactId != null 
                    && await InsertContactPhoto(input.Photo, contactId.Value) 
                    && await InsertContactNumbers(input.PhoneNumbers, contactId.Value))
                {
                    transaction.Complete();
                    return contactId;
                }

                transaction.Dispose();
                return default;
            }
            catch (Exception ex)
            {
                transaction.Dispose();
                throw ex;
            }
        }

        public async Task<GetContactByIdOutput> GetContactById(int id)
        {
            string sql = $@"SELECT *
                            FROM Contact c 
                            LEFT JOIN ContactNumber cn on cn.ContactId = c.Id
                            LEFT JOIN ContactPhoto cp on cp.ContactId = c.Id
                            WHERE c.Id = {id}";

            using var conn = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            conn.Open();

            var contactDao = await conn.QueryAsync<ContactDAO, ContactNumberDAO, ContactPhotoDAO, ContactDAO>(sql, (contact, number, photo) =>
            {
                if (contact.PhoneNumbers == null)
                    contact.PhoneNumbers = new List<ContactNumberDAO>();

                if (number != null)
                {
                    contact.PhoneNumbers.Add(number);
                }

                if (photo != null)
                {
                    contact.Photo = photo;
                }

                return contact;
            });

            var result = contactDao;

            if (contactDao != null && contactDao.Count() > 1)
            {
                result = contactDao.GroupBy(p => p.Id).Select(g =>
                {
                    var groupedContact = g.First();
                    if (groupedContact.PhoneNumbers != null)
                    {
                        groupedContact.PhoneNumbers = g.Select(p => p.PhoneNumbers.Single()).ToList();
                    }

                    return groupedContact;
                });
            }

            conn.Close();

            return _mapper.Map<GetContactByIdOutput>(result.FirstOrDefault());
        }

        public async Task<GetContactsOutput> GetContacts(GetContactsInput input)
        {
            GetContactsOutput result = new();

            using var connection = Connection;

            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            string searchCriteriaSQL = input.SearchCriteria != null ?
                $@"where FullName like '%{input.SearchCriteria}%'" :
                string.Empty;

            connection.Open();

            var contactsList = await connection.GetListPagedAsync<ContactDAO>(input.PageNumber, input.ItemsPerPage,
                searchCriteriaSQL,
                input.OrderBy);

            foreach (var contact in contactsList)
            {
                var number = await _contactNumberRepository.GetPreferedContactNumber(contact.Id);
                if (number != null)
                {
                    contact.PhoneNumbers = new List<ContactNumberDAO>();
                    contact.PhoneNumbers.Add(_mapper.Map<ContactNumberDAO>(number));
                }

                var photo = await connection.QueryAsync<ContactPhotoDAO>($"Select * from ContactPhoto where ContactId = {contact.Id}");

                if (photo != null && photo.Any())
                {
                    contact.Photo = photo.FirstOrDefault();
                }
            }

            var totalRecords = await connection.RecordCountAsync<ContactDAO>(searchCriteriaSQL);
            var totalPages = (int)Math.Ceiling((totalRecords / (decimal)input.ItemsPerPage));

            connection.Close();

            if (contactsList != null)
            {
                result = new GetContactsOutput
                {
                    Contacts = _mapper.Map<IList<Contact>>(contactsList),
                    TotalPages = totalPages,
                    TotalRecords = totalRecords
                };
            }

            return result;
        }

        public async Task<bool> UpdateContact(int id)
        {
            try
            {
                //using var connection = Connection;
                //SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);
                //connection.Open();
                //var numberRowsAffected = await connection.UpdateAsync<ContactDAO>(id);
                //connection.Close();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteContact(int id)
        {
            try
            {
                if(await DeleteIfContactHasPhoto(id) &&
                await DeleteIfContactHasNumbers(id) 
                //&& await RemoveIfContactIsInGroup(id)
                )
                {
                    return await DeleteAsync(id);
                }

                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<bool> InsertContactPhoto(IFormFile photo, int contactId)
        {
            if (photo != null)
            {                
                var photoUrl = await _fileManager.UploadFile(photo);

                ContactPhotoDAO photoDAO = new ContactPhotoDAO 
                { 
                    Name = photo.FileName, 
                    ContactId = contactId, 
                    Url = photoUrl 
                };

                var insertedId = (int?)await InsertAsync<ContactPhotoDAO>(photoDAO);

                if (!insertedId.HasValue)
                {
                    return false;
                }
            }

            return true;
        }

        private async Task<bool> InsertContactNumbers(ContactNumber[] numbers, int contactId)
        {
            if (numbers != null && numbers.Length > 0)
            {
                foreach (var number in numbers)
                {
                    var numberDao = _mapper.Map<ContactNumberDAO>(number);

                    numberDao.ContactId = contactId;

                    var insertedId = (int?)await InsertAsync<ContactNumberDAO>(numberDao);

                    if (!insertedId.HasValue)
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private async Task<bool> DeleteIfContactHasPhoto(int contactId)
        {
            try
            {
                using var connection = Connection;

                SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

                connection.Open();

                var photo = await connection.RecordCountAsync<ContactPhotoDAO>($"where ContactId = {contactId}");

                if (photo >= 1)
                {
                    var result = await connection.DeleteListAsync<ContactPhotoDAO>($"where ContactId = {contactId}");
                    return result >= 1;
                }
                connection.Close();

                return true;                

            } 
            catch (Exception ex)
            {
                throw ex;
            }            
        }

        private async Task<bool> DeleteIfContactHasNumbers(int contactId)
        {
            try
            {
                using var connection = Connection;

                SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

                connection.Open();
                var numbers = await connection.RecordCountAsync<ContactNumberDAO>($"where ContactId = {contactId}");

                if (numbers >= 1)
                {
                    var result = await connection.DeleteListAsync<ContactNumberDAO>($"where ContactId = {contactId}");
                    return result >= 1;
                }

                connection.Close();

                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //private async Task<bool> RemoveIfContactIsInGroup(int contactId)
        //{
        //    try
        //    {
        //        using var connection = Connection;

        //        SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

        //        connection.Open();
                                
        //        var contact = await connection.GetAsync<ContactDAO>(contactId);

        //        if (contact.GroupId != null)
        //        {
        //            var result = await connection.DeleteListAsync<ContactGroupDAO>($"where ContactId = {contactId}");
        //            return result >= 1;
        //        }
        //        connection.Close();

        //        return true;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}
