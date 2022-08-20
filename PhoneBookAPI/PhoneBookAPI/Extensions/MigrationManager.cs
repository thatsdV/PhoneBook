using FluentMigrator.Runner;
using System.Data.SQLite;
using PhoneBookAPI.Infrastructure.Migrations;

namespace PhoneBookAPI.Extensions
{
    public static class MigrationManager
    {
        public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var serviceProvider = CreateServices(configuration);

            CreateDatabaseFileIfNotExists();

            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }
        }

        private static IServiceProvider CreateServices(IConfiguration configuration)
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSQLite()
                    .WithGlobalConnectionString(configuration.GetConnectionString("DatabaseConnectionString"))
                    .ScanIn(typeof(AddContactTable).Assembly).For.Migrations())
                .BuildServiceProvider(false);
        }

        private static void CreateDatabaseFileIfNotExists()
        {
            if (!File.Exists("PhoneBook.db"))
                SQLiteConnection.CreateFile("PhoneBook.db");
        }

        private static void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();

            runner.MigrateUp();
        }
    }
}
