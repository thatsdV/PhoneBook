using Microsoft.Extensions.DependencyInjection;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Infrastructure.Repositories.Implementations;
using PhoneBookAPI.Utils;
using PhoneBookAPI.Utils.Files;

namespace PhoneBookAPI.IoC
{
    public static class IoC
    {
        public static void RegisterIoC(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.RegisterRepositories();
        }

        private static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IContactRepository, ContactRepository>();
            services.AddScoped<IContactNumberRepository, ContactNumberRepository>();
            services.AddScoped<IContactGroupRepository, ContactGroupRepository>();
            services.AddTransient<IFileManager, FileManager>();
        }
    }
}