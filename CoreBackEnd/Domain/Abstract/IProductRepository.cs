using Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Abstract
{
	public interface IProductRepository
	{
		IEnumerable<Product> Products { get; }
		Task<Product> SaveProduct(Product product);
		Task DeleteProduct(int[] id);
	}
}
