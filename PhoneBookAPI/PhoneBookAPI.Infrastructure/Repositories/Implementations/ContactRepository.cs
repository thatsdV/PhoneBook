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

        public async Task GetContactById()
        {

        }

        public async Task GetContacts()
        {
            using var connection = Connection;
            connection.Open();
            //var result = await connection.GetListPaged<ContactDAO>(1, 10, "1", "1");
            connection.Close();
        }

        public async Task UpdateContact()
        {

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
