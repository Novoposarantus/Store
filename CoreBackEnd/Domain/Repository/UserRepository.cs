using Domain.Abstract;
using Domain.Model;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repository
{
	public class UserRepository : IUserRepository
	{
		MyDbContext context;

		public UserRepository(MyDbContext context)
		{
			this.context = context;
		}

		public IQueryable<User> Users { get { return context.Users.Include(u=>u.Role); } }
		public Task<User> GetUser(string username)
		{
			return context.Users.Where(u => u.UserName == username).Include(u => u.Role).FirstOrDefaultAsync();
		}
		public async Task SaveNewUser(User user)
		{
			var request = await GetUser(user.UserName);
			if (request == null )
			{
				context.Add(user);
			}
			else{
				throw new ArgumentException("User are registered");
			}
			await context.SaveChangesAsync();
		}
		public async Task ChangeRole(string oldRoleName,string newRoleName)
		{
			var newRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == newRoleName);
			foreach(var user in Users.Where(u=>u.Role.Name == oldRoleName) )
			{
				user.Role = newRole;
			}
			await context.SaveChangesAsync();
		}

		public async Task UpdateUser(string userName, string newRoleName)
		{
			var user = await Users.FirstOrDefaultAsync(u => u.UserName == userName);
			if (user.Role.Name != newRoleName )
			{
				var newRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == newRoleName);
				user.Role = newRole;
				await context.SaveChangesAsync();
			}
		}
	}
}
