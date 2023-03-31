using DesafioBackend.Data.Repositories;
using DesafioBackend.Domain.Interfaces.Reposities;
using DesafioBackend.Domain.Interfaces.Services;
using DesafioBackend.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace DesafioBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(o => o.AddPolicy("CorsConfig", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "desafio_backend", Version = "v1" });
            });

            services.AddHttpClient();

            services.AddSingleton(Configuration);

            services.AddScoped<IRepositoryEmpresa, RepositoryEmpresa>();
            services.AddScoped<IRepositoryFornecedor, RepositoryFornecedor>();
            services.AddScoped<IRepositoryContrato, RepositoryContrato>();

            services.AddScoped<ICepLaService, CepLaService>();
            services.AddScoped<IContratoService, ContratoService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "desafio_backend v1"));
            }

            app.UseCors("CorsConfig");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
