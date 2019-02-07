using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels;

namespace Web.Controllers
{
	[Authorize(Policy= "AccessToUserManager")]
    public class UserManagerController : Controller
    {
		IUserRepository userRepository;
		public UserManagerController(IUserRepository userRepository)
		{
			this.userRepository = userRepository;
		}
		public JsonResult GetUsers()
		{
			var jsonData = new List<UserJsonResult>();
			foreach (var user in userRepository.Users )
			{
				jsonData.Add(new UserJsonResult() {
					UserName = user.UserName,
					RoleName = user.Role.Name
				});
			}
			return Json(jsonData);
		}
		[HttpPost]
		public async Task<IActionResult> UpdateUser([FromBody]UserJsonResult model)
		{
			await userRepository.UpdateUser(model.UserName, model.RoleName);
			return Json($"User {model.UserName} successfully updated");
		}
	}
	
}