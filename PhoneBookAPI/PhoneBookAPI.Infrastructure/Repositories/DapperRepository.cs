using AutoMapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace PhoneBookAPI.Infrastructure.Repositories
{
    public abstract class DapperRepository
    {
        protected internal readonly IMapper Mapper;
        private readonly IConfiguration _configuration;

        protected DapperRepository(IMapper mapper, IConfiguration configuration)
        {
            Mapper = mapper;
            _configuration = configuration;
        }

        protected internal IDbConnection Connection =>
            new SqliteConnection(_configuration.GetConnectionString("DatabaseConnectionString"));
    }
}
