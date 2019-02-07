using Domain.Abstract;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
	public class AccessUsersRepository : IAccessUsersRepository
	{
		MyDbContext context;
		public AccessUsersRepository(MyDbContext context)
		{
			this.context = context;
		}
		public IEnumerable<AccessUser> AccessUsers => context.AccessUsers;

		public async Task SaveUser(AccessUser user)
		{
			context.AccessUsers.Add(user);
			await context.SaveChangesAsync();
		}
	}
}
