using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Infrastructure.Repositories.DAO;
using System.Transactions;

namespace PhoneBookAPI.Infrastructure.Repositories.Implementations
{
    public class ContactNumberRepository : BaseRepository<ContactNumberDAO>, IContactNumberRepository
    {
        private readonly IMapper _mapper;

        public ContactNumberRepository(IMapper mapper, IConfiguration configuration) : base(mapper, configuration)
        {
            _mapper = mapper;
        }

        public async Task<bool> InsertContactNumber(ContactNumber contactNumber)
        {
            using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var contact = _mapper.Map<ContactNumberDAO>(contactNumber);

                var inserted = (int?)await InsertAsync<ContactNumberDAO>(contact);

                transaction.Complete();

                return inserted.HasValue;
            }
            catch (Exception ex)
            {
                transaction.Dispose();
                throw ex;
            }
        }

        public async Task<ContactNumber> GetPreferedContactNumber(int contactId)
        {
            string sql = $@"SELECT *
                            FROM ContactNumber 
                            WHERE ContactId = {contactId}
                            LIMIT 1";

            using var conn = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);

            conn.Open();

            var contactNumberDao = await conn.QueryAsync<ContactNumberDAO>(sql);

            conn.Close();

            return _mapper.Map<ContactNumber>(contactNumberDao.FirstOrDefault());
        }
    }
}
