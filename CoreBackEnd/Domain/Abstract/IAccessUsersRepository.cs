using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IAccessUsersRepository
    {
		IEnumerable<AccessUser> AccessUsers { get; }
		Task SaveUser(AccessUser user);
    }
}
