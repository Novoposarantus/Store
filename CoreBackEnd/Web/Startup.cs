using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Abstract;
using Domain.Model;
using Domain.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Web.Filters;
using Web.Hubs;
using Web.permission;

namespace Web
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }
		
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddScoped<IProductRepository, ProductRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IAccessUsersRepository, AccessUsersRepository>();
			services.AddScoped<IRoleRepository, RoleRepository>();
			services.AddScoped<IPermissionRepository, PermissionRepository>();
			services.AddScoped<IAuthorizationHandler, PermissionHandler>();
			services.AddScoped<IClientRepository, ClientsRepository>();
			services.AddScoped<IChatRepository, ChatRepository>();
			services.AddSingleton<IUserIdProvider, UserIdProvider>();

			services.AddSignalR();

			string connection = Configuration.GetConnectionString("DefaultConnection");
			services.AddDbContext<MyDbContext>(options =>
			  options.UseSqlServer(connection));

			services.AddMvc(options =>
			{
				options.Filters.Add(new ResponseFilter(services.BuildServiceProvider().GetService<IClientRepository>()));
			});
			services.AddCors();

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
					{
						options.RequireHttpsMetadata = false;
						options.TokenValidationParameters = new TokenValidationParameters
						{
							ValidateIssuer = true,
							ValidIssuer = AuthOptions.ISSUER,
							ValidateAudience = true,
							ValidAudience = AuthOptions.AUDIENCE,
							ValidateLifetime = true,
							IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
							ValidateIssuerSigningKey = true,
						};
						options.Events = new JwtBearerEvents
						{
							OnMessageReceived = context =>
							{
								var accessToken = context.Request.Query["access_token"];

								// если запрос направлен хабу
								var path = context.HttpContext.Request.Path;
								if( !string.IsNullOrEmpty(accessToken) &&
									( path.StartsWithSegments("/chat") ) )
								{
									// получаем токен из строки запроса
									context.Token = accessToken;
								}
								return Task.CompletedTask;
							}
						};
					});

			services.AddAuthorization(options =>
			{
				foreach( var permission in PermissionManager.GetListPermissions(services.BuildServiceProvider().GetService<IPermissionRepository>()) )
				{
					options.AddPolicy(permission.Name, policy => policy.Requirements.Add(new PermissionRequirement(permission)));
				}
			});
		}
		
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider provider)
		{
			if( env.IsDevelopment() )
			{
				app.UseBrowserLink();
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}
			
			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials());
			
			app.UseDefaultFiles();
			app.UseStaticFiles();
			app.UseAuthentication();
			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});
			var clientRepository = provider.GetService<IClientRepository>();
			app.UseSignalR(routes =>
			{
				routes.MapHub<ChatHub>("/chatHub");
			});

		}
	}
}
