using Domain.Model;
using Domain.Abstract;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repository
{
	public class ClientsRepository : IClientRepository
	{
		MyDbContext context;
		public ClientsRepository(MyDbContext context)
		{
			this.context = context;
		}

		public IQueryable<Client> Clients => context.Clients;

		public async Task<bool> CheckClient(string url)
		{
			var client = await Clients.FirstOrDefaultAsync(c => c.Url == url);
			return client != null;
		}
		public async Task<string> GetName(string url)
		{
			var client = await Clients.FirstOrDefaultAsync(c => c.Url == url);
			return client.Name;
		}
	}
}
