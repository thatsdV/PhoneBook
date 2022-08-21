using Microsoft.Extensions.DependencyInjection;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Infrastructure.Repositories.Implementations;

namespace PhoneBookAPI.IoC
{
    public static class IoC
    {
        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IContactRepository, ContactRepository>();
        }
    }
}