using AutoMapper;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace PhoneBookAPI.Infrastructure.Repositories
{
    public abstract class BaseRepository<TEntity> where TEntity : class
    {
        protected internal readonly IMapper Mapper;
        private readonly IConfiguration _configuration;

        protected BaseRepository(IMapper mapper, IConfiguration configuration)
        {
            Mapper = mapper;
            _configuration = configuration;
        }

        protected internal IDbConnection Connection =>
            new SqliteConnection(_configuration.GetConnectionString("DatabaseConnectionString"));

        protected internal async Task<object> InsertAsync<T>(object entity) where T : class
        {
            using var conn = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);
            conn.Open();
            var result = await conn.InsertAsync(entity as T);
            conn.Close();
            return result;
        }

        protected internal async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            using var connection = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);
            connection.Open();
            var result = await connection.GetListAsync<TEntity>();
            connection.Close();
            return result;
        }

        protected internal async Task<TEntity> GetAsync(object id)
        {
            using var connection = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);
            connection.Open();
            var result = await connection.GetAsync<TEntity>(id);
            connection.Close();
            return result;
        }

        protected internal async Task<bool> DeleteAsync(object id)
        {
            using var connection = Connection;
            SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLite);
            connection.Open();
            var numberRowsAffected = await connection.DeleteAsync<TEntity>(id);
            connection.Close();
            return numberRowsAffected == 1;
        }
    }
}
