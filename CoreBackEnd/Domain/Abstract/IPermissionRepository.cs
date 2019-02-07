using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Domain.Abstract
{
	public interface IPermissionRepository
	{
		IQueryable<Permission> Permissions { get; }
		bool CheckPermission(ClaimsPrincipal user, string permissionName);
		bool CheckPermission(User user, string permissionName);
		void UpdatePermissions(params Permission[] permissions);
	}
}
