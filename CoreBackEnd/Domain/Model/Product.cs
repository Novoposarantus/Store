using System;

namespace Domain.Model
{
	public class Product : OpenProduct
	{
		public string Source { get; set; }
	}

	public class OpenProduct
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Category { get; set; }
		public bool Exist { get; set; }
		public decimal Price { get; set; }

		public OpenProduct(int id,string name,string category, bool exist, decimal price)
		{
			Id = id;
			Name = name;
			Category = category;
			Exist = exist;
			Price = price;
		}
		public OpenProduct(Product product)
		{
			Id = product.Id;
			Name = product.Name;
			Category = product.Category;
			Exist = product.Exist;
			Price = product.Price;
		}
		public OpenProduct() { }
	}
}
