using Microsoft.AspNetCore.SignalR;

namespace Domain.Model
{
	public class UserIdProvider : IUserIdProvider
	{
		public virtual string GetUserId(HubConnectionContext connection)
		{
			return connection.User?.Identity.Name;
		}
	}
}
