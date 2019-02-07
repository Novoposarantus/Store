using Domain.Abstract;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Web.permission
{
	public class PermissionRequirement : IAuthorizationRequirement
	{
		public PermissionRequirement(Permission permission)
		{
			this.Permission = permission;
		}
		public Permission Permission { get; }
	}
	public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
	{
		IPermissionRepository permissionRepository;
		IAccessUsersRepository accessUsersRepository;
		public PermissionHandler( IPermissionRepository permissionRepository, IAccessUsersRepository accessUsersRepository) : base()
		{
			this.accessUsersRepository = accessUsersRepository;
			this.permissionRepository = permissionRepository;
		}
		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
		{
			if(context.User == null )
			{
				return;
			}
			if (!context.User.HasClaim(c=>c.Type == "Permission") )
			{
				return;
			}

			if( permissionRepository.CheckPermission(context.User, requirement.Permission.Name) )
			{
				await accessUsersRepository.SaveUser(new AccessUser()
				{
					UserId = int.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value),
					UserName = context.User.FindFirst(ClaimsIdentity.DefaultNameClaimType)?.Value,
					Date = DateTime.UtcNow,
					NamePage = requirement.Permission.Location
				});
				context.Succeed(requirement);
			}
		}
	}
}
