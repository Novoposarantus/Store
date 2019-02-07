using Domain.Model;
using System.Linq;

namespace Web.ViewModels
{
	public class RolesJsonResult
	{
		public int RoleId { get; set; }
		public string Name { get; set; }
		public string[] Permissions { get; set; }
		public RolesJsonResult() { }
		public RolesJsonResult(Role role)
		{
			this.RoleId = role.RoleId;
			this.Name = role.Name;
			var permissions = role.RolePermissions.Select(r => r.Permission).ToArray();
			this.Permissions = permissions.Select(p => p.Name).ToArray();
		}
	}
}
