using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Model
{
	public class Permission
	{
		public int PermissionId { get; set; }
		public string Name { get; set; }
		public string Location { get; set; }
		public virtual ICollection<RolePermission> RolePermissions { get; set; }
	}
}
