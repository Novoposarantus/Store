using Domain.Abstract;
using Domain.Model;
using System.Linq;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace Domain.Repository
{
	public class ProductRepository : IProductRepository
	{
		MyDbContext context;
		public IEnumerable<Product> Products { get { return context.Products; } }
		public ProductRepository(MyDbContext context)
		{
			this.context = context;
		}
		public async Task<Product> SaveProduct(Product product)
		{
			var p = context.Products.Add(product);
			await context.SaveChangesAsync();
			return p.Entity;
		}
		public async Task DeleteProduct(int[] items)
		{
			for( var i = 0; i < items.Length; ++i )
			{
				var product = context.Products.FirstOrDefault(x => x.Id == items[i]);
				if( product != null )
				{
					context.Products.Remove(product);
				}
				else
				{
					throw new ArgumentNullException("Can not find product with this id");
				}
				await context.SaveChangesAsync();
			}
		}
	}
}
