using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace Web.Controllers
{
	public class ProductController : Controller
	{
		readonly IProductRepository productRepository;
		readonly IAccessUsersRepository accessUsersRepository;
		readonly IClientRepository clientRepository;
		readonly IPermissionRepository permissionRepository;
		public ProductController(IProductRepository productRepository,
								 IAccessUsersRepository accessUsersRepository,
								 IClientRepository clientRepository,
								 IPermissionRepository permissionRepository)
		{
			this.productRepository = productRepository;
			this.permissionRepository = permissionRepository;
			this.accessUsersRepository = accessUsersRepository;
			this.clientRepository = clientRepository;
		}
		[Authorize(Policy = "DeleteProducts")]
		[Route("DeleteProduct")]
		[HttpPost]
		public async Task<IActionResult> Delete([FromBody]int[] data)
		{
			if( ModelState.IsValid )
			{
				await productRepository.DeleteProduct(data);
				return Json("Products deleted");
			}
			else
			{
				return Json(new { status = "error", message = "model not valid" });
			}
		}
		[Authorize(Policy = "CreateProduct")]
		[Route("CreateProduct")]
		[HttpPost]
		public async Task<JsonResult> Create([FromBody]Product product)
		{
			if( ModelState.IsValid )
			{
				var url = ( (Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.FrameRequestHeaders)( (Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)this.Request ).Headers ).HeaderOrigin.First();
				var clientName = await clientRepository.GetName(url);
				product.Source = clientName;
				var savedProduct = await productRepository.SaveProduct(product);
				return Json(savedProduct);
			}
			else
			{
				return Json(new { status = "error", message = "model not valid" });
			}
		}
		[Route("ProductData")]
		public JsonResult Tables(string nameFilter = "", string categoryFilter = "", bool existFilter = false)
		{
			var jsonData = productRepository.Products;

			return Json(permissionRepository.CheckPermission(HttpContext.User, "ShowProductSource")
					? jsonData
					: jsonData.Select(product => new OpenProduct(product)));
		}
		[Authorize(Policy = "ShowProductSource")]
		public IActionResult ShowFramework()
		{
			return Ok(true);
		}
	}
}
