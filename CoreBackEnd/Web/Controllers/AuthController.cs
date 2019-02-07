using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Abstract;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Web.ViewModels;

namespace Web.Controllers
{
	public class AuthController : Controller
	{
		IUserRepository userRepository;
		IRoleRepository roleRepository;
		public AuthController(IUserRepository userRepository, IRoleRepository roleRepository)
		{
			this.userRepository = userRepository;
			this.roleRepository = roleRepository;
		}
		[Route("token")]
		[HttpPost]
		public async Task Token([FromBody]LoginModel model)
		{
			var user = await userRepository.GetUser(model.Login);
			if( user == null )
			{
				Response.StatusCode = 400;
				await Response.WriteAsync("Invalid username or password.");
				return;
			}

			var identity = await GetIdentity(user, model.Password);

			var now = DateTime.UtcNow;
			var audience = ( (Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.FrameRequestHeaders)( (Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)this.Request ).Headers ).HeaderOrigin.First();
			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					notBefore: now,
					claims: identity,
					expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var permissions = (await roleRepository.GetPermissions(user.Role.Name)).Select(p=>p.Name);

			var response = new
			{
				access_token = encodedJwt,
				timeOut = AuthOptions.LIFETIME,
				userName = user.UserName,
				permissions
			};

			Response.ContentType = "application/json";
			await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
		}
		[Route("registration")]
		[HttpPost]
		public async Task<IActionResult> Registration([FromBody]RegistrationModel model)
		{
			try
			{
				var role = await roleRepository.GetRole("user");
				await userRepository.SaveNewUser(new User() {
					UserName = model.Login,
					Password = Convert.ToBase64String(new SHA256Managed().ComputeHash(Encoding.UTF8.GetBytes(model.Password))),
					Role = role
			});
				return Json($"User {model.Login} successfully registered");
			}catch (ArgumentException)
			{	
				return Json($"User {model.Login} has already been registered");
			}
		}
		[Authorize]
		[Route("GetPermissions")]
		public async Task GetPermissions()
		{
			var userName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimsIdentity.DefaultNameClaimType).Value;
			var user = await userRepository.GetUser(userName);
			var permissions = (await roleRepository.GetPermissions(user.Role.Name)).Select(p => p.Name);
			
			Response.ContentType = "application/json";
			await Response.WriteAsync(JsonConvert.SerializeObject(new {userName = user.UserName, permissions}, new JsonSerializerSettings { Formatting = Formatting.Indented }));
		}
		private async Task<IReadOnlyCollection<Claim>> GetIdentity(User user, string password)
		{
			List<Claim> claims = null;
			if( user != null )
			{
				var sha256 = new SHA256Managed();
				var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
				var permissions = await roleRepository.GetPermissions(user.Role.Name);

				if( passwordHash == user.Password )
				{
					claims = new List<Claim>
					{
						new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
						new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName)
					};
					foreach( var name in permissions.Select(p=>p.Name) )
					{
						claims.Add(new Claim("Permission", name));
					}
				}
			}
			return claims;
		}
	}
}