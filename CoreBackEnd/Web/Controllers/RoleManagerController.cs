using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels;

namespace Web.Controllers
{
	[Authorize(Policy = "AccessToRoleManager")]
	public class RoleManagerController : Controller
	{
		IPermissionRepository permissionRepository;
		IRoleRepository roleRepository;
		IUserRepository userRepository;

		public RoleManagerController(IPermissionRepository permissionRepository, IRoleRepository roleRepository, IUserRepository userRepository)
		{
			this.permissionRepository = permissionRepository;
			this.roleRepository = roleRepository;
			this.userRepository = userRepository;
		}
		public JsonResult GetPermissions()
		{
			var jsonData = permissionRepository.Permissions;
			return Json(jsonData);
		}
		public JsonResult GetRoles()
		{
			var roles = roleRepository.Roles;
			var jsonData = new List<RolesJsonResult>();
			foreach( var role in roles )
			{
				var permissions = role.RolePermissions.Select(r => r.Permission).ToArray();
				jsonData.Add(new RolesJsonResult()
				{
					RoleId = role.RoleId,
					Name = role.Name,
					Permissions = permissions.Select(p => p.Name).ToArray()
				});
			}
			return Json(jsonData);
		}
		[HttpPost]
		public async Task<IActionResult> UpdateRole([FromBody]RolesJsonResult model)
		{
			await roleRepository.UpdateRole(model.RoleId, model.Permissions);
			return Json($"Role {model.Name} successfully updated");
		}
		[HttpPost]
		public async Task<JsonResult> AddRole([FromBody]RoleNameModel inputRole)
		{
			if(inputRole == null )
			{
				return Json("Role name is null");
			}
			var realRole = await roleRepository.AddRole(inputRole.RoleName);
			var outputRole = new RolesJsonResult(realRole);
			return Json(outputRole);
		}
		[HttpPost]
		public async Task<IActionResult> DeleteRole([FromBody]RoleNameModel role)
		{
			await userRepository.ChangeRole(role.RoleName, "user");
			await roleRepository.DeleteRole(role.RoleName);
			return Json($"Role {role.RoleName} successfully deleted");
		}
	}
	

}