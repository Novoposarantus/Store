using Domain.Abstract;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Domain.Repository
{
	public class PermissionRepository : IPermissionRepository
	{
		MyDbContext context;
		public PermissionRepository(MyDbContext context)
		{
			this.context = context;
		}
		public IQueryable<Permission> Permissions => context.Permissions;

		public bool CheckPermission(ClaimsPrincipal user, string permissionName)
		{
			return user.Claims.Where(c => c.Type == "Permission").Select(c => c.Value).FirstOrDefault(p => p == permissionName) != null;
		}
		public bool CheckPermission(User user, string permissionName)
		{
			var permissions = context.Roles.Include(r => r.RolePermissions).ThenInclude(r => r.Permission).FirstOrDefault(r=>r.RoleId == user.RoleId).RolePermissions.Select(r=>r.Permission);
			return permissions.FirstOrDefault(permission => permission.Name == permissionName) != null;
		}

		public void UpdatePermissions(params Permission[] newPermissions)
		{
			foreach( var permission in newPermissions )
			{
				var newPermission = context.Permissions
										.FirstOrDefault(p => p.Name == permission.Name ||
													   p.Location == permission.Location);
				if( newPermission == null )
				{
					context.Permissions.Add(permission);
					context.RolePermissions.Add(new RolePermission()
					{
						Role = context.Roles.FirstOrDefault(r => r.Name == "admin") ?? throw new ArgumentNullException(),
						Permission = permission
					});
				}
				else
				{
					newPermission.Name = permission.Name;
					newPermission.Location = permission.Location;
				}
			}
			if( Permissions.ToArray().Length > newPermissions.Length )
			{
				foreach( var permission in Permissions )
				{
					if(newPermissions.FirstOrDefault(p=>p.Name == permission.Name && p.Location == permission.Location) == null )
					{
						context.Permissions.Remove(permission);
						context.RolePermissions.RemoveRange(
							context.RolePermissions.Where(rp => rp.Permission == permission));
					}
				}
			}
			context.SaveChanges();
		}
	}
}
