using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Model
{
	public class Role
	{
		public int RoleId { get; set; }
		public string Name { get; set; }
		public virtual ICollection<RolePermission> RolePermissions { get; set; }
	}
}
