using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;
using PhoneBookAPI.Infrastructure.Repositories.DAO;
using System.Transactions;

namespace PhoneBookAPI.Infrastructure.Repositories.Implementations
{
    public class ContactRepository : BaseRepository<ContactDAO>, IContactRepository
    {
        private readonly IMapper _mapper;

        public ContactRepository(IMapper mapper, IConfiguration configuration) : base(mapper, configuration)
        {
            _mapper = mapper;
        }

        public async Task<int?> InsertContact(Contact input)
        {
            using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var contact = _mapper.Map<ContactDAO>(input);

                var inserted = (int?)await InsertAsync<ContactDAO>(contact);

                transaction.Complete();

                return inserted;
            }
            catch (Exception ex)
            {
                transaction.Dispose();
                throw ex;
            }
        }

        public async Task<Contact> GetContactById(int id)
        {
            string sql = $@"SELECT *
                            FROM Contact c 
                            LEFT JOIN ContactNumber cn on cn.ContactId = c.Id
                            WHERE c.Id = {id}";

            using var conn = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            conn.Open();

            var contactDao = await conn.QueryAsync<ContactDAO, ContactNumberDAO, ContactDAO>(sql, (contact, number) =>
            {
                if (contact.PhoneNumbers == null)
                    contact.PhoneNumbers = new List<ContactNumberDAO>();

                if (number != null)
                {
                    contact.PhoneNumbers.Add(number);
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

            return _mapper.Map<Contact>(result.FirstOrDefault());
        }

        public async Task<GetContactsOutput> GetContacts(GetContactsInput input)
        {
            GetContactsOutput result = new();

            using var connection = Connection;

            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            //$@"where (FullName like %{input.SearchCriteria}% or PreferedNumber like %{input.SearchCriteria}%)",
            string searchCriteriaSQL = input.SearchCriteria != null ?
                $@"where FullName like '%{input.SearchCriteria}%'" :
                string.Empty;

            connection.Open();

            var contactsList = await connection.GetListPagedAsync<ContactDAO>(input.PageNumber - 1, input.ItemsPerPage,
                searchCriteriaSQL,
                string.Empty);

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
                return await DeleteAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
