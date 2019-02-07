using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
	public interface IRoleRepository
	{
		IQueryable<Role> Roles { get; }
		Task<Role> GetRole(string roleName = "");
		Task UpdateRole(int roleId, string[] permissions);
		Task<Permission[]> GetPermissions(string roleName = "");
		Task<Role> AddRole(string roleName);
		Task DeleteRole(string roleName);
	}
}
