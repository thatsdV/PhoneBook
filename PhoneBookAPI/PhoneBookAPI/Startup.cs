using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PhoneBookAPI.Application.Commands.CreateContact;
using PhoneBookAPI.Extensions;
using PhoneBookAPI.IoC;
using System.Text.Json;

namespace PhoneBookAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });

            services.AddHttpContextAccessor();

            services.AddSwaggerGen();

            services.AddMvc();

            services.AddMediatR(typeof(CreateContactCommandHandler).Assembly);

            services.Configure<ApiBehaviorOptions>(options => options.SuppressInferBindingSourcesForParameters = true);

            services.AddFluentValidation(options =>
            {
                options.RegisterValidatorsFromAssembly(typeof(CreateContactCommandHandler).Assembly);
            });

            services.ConfigureDatabase(Configuration);

            services.RegisterRepositories();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PhoneBook v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
