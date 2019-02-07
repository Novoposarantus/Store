using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Domain.Model;
using Domain.Repository;
using Domain.Abstract;

namespace Web.permission
{
	public class PermissionManager
	{
		public static IEnumerable<Permission> GetListPermissions(IPermissionRepository permissionRepository = null)
		{
			var project = Assembly.GetExecutingAssembly();
			var permissionsMethods = ( from type in project.GetTypes()
									   where typeof(Controller).IsAssignableFrom(type)
									   from method in type.GetMethods()
									   where method.GetCustomAttribute<AuthorizeAttribute>()?.Policy != null
									   select new Permission()
									   {
									   	Location = $"{type.Name}/{method.Name}",
									   	Name = method.GetCustomAttribute<AuthorizeAttribute>().Policy
									   } ).ToArray();

			var permissionsTypes = ( from type in project.GetTypes()
									 where typeof(Controller).IsAssignableFrom(type)
									 where type.GetCustomAttribute<AuthorizeAttribute>()?.Policy != null
									 select new Permission()
									 {
										 Location = $"{type.Name}",
										 Name = type.GetCustomAttribute<AuthorizeAttribute>().Policy
									 } ).ToArray();

			//Реализовать добавление в базу данных
			var permissions = permissionsMethods.Concat(permissionsTypes);
			if( permissionRepository != null )
			{
				permissionRepository.UpdatePermissions(permissions.ToArray());
			}
			return permissions;
		}
	}
}
