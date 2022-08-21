using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
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

                if (inserted.HasValue)                    
                    return inserted.Value;

                transaction.Complete();
                return null;                         
            }
            catch (Exception ex)
            {
                transaction.Dispose();
                throw ex;
            }
        }

        public async Task<Contact> GetContactById(int id)
        {
            var contact = await GetAsync(id);
            return _mapper.Map<Contact>(contact);
        }

        public async Task<IEnumerable<Contact>> GetContacts(int pageNumber, int rowsPerPage)
        {            
            using var connection = Connection;

            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            connection.Open();

            var contactsList = await connection.GetListPagedAsync<ContactDAO>(pageNumber, rowsPerPage, string.Empty, string.Empty);

            connection.Close();

            return _mapper.Map<IEnumerable<Contact>>(contactsList);
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
