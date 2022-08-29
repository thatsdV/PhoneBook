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
