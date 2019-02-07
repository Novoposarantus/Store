using Domain.Abstract;
using Domain.Model;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace Domain.Repository
{
	public class RoleRepository : IRoleRepository
	{
		MyDbContext context;
		public RoleRepository(MyDbContext context)
		{
			this.context = context;
		}
		public IQueryable<Role> Roles => context.Roles.Include(r => r.RolePermissions).ThenInclude(r=>r.Permission);
		public Task<Role> GetRole(string roleName = "")
		{
			if( roleName == "")
			{
				return null;
			}
			return Roles.FirstOrDefaultAsync(r => r.Name.ToUpper() == roleName.ToUpper());
		}
		public async Task<Permission[]> GetPermissions(string roleName = "")
		{
			var role = await GetRole(roleName);
			if( role != null )
			{
				return role.RolePermissions.Select(rp => rp.Permission).ToArray();
			}
			return null;
		}
		public async Task UpdateRole(int roleId, string[] permissions)
		{
			context.RolePermissions.RemoveRange(context.RolePermissions.Where(r => r.RoleId == roleId));

			foreach(var permissionName in permissions )
			{
				var permissionId = context
									.Permissions
									.FirstOrDefault(p => p.Name == permissionName)
									.PermissionId;
				context.RolePermissions.Add(new RolePermission()
				{
					RoleId = roleId,
					PermissionId = permissionId
				});
			}
			await context.SaveChangesAsync();
		}
		public async Task<Role> AddRole(string roleName)
		{
			var role = await GetRole(roleName);
			if(role == null )
			{
				var r = context.Roles.Add(new Role() { Name = roleName });
				await context.SaveChangesAsync();
				var newRole = await GetRole(r.Entity.Name);
				return newRole;
			}
			return null;
		}
		public async Task DeleteRole(string roleName)
		{
			var role = await GetRole(roleName);
			if( role != null )
			{
				context.Roles.Remove(role);
				await context.SaveChangesAsync();
			}
		}
	}
}
