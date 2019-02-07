using Domain.Model;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Abstract
{
	public interface IClientRepository
	{
		IQueryable<Client> Clients { get; }
		Task<bool> CheckClient(string url);
		Task<string> GetName(string url);
	}
}
