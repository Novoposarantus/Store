using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IUserRepository
	{
		IQueryable<User> Users { get; }
		Task<User> GetUser(string username);
		Task SaveNewUser(User user);
		Task ChangeRole(string oldRoleName, string newRoleName);
		Task UpdateUser(string userName, string newRoleName);
	}
}
