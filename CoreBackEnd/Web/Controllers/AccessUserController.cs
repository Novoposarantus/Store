using Domain;
using Domain.Abstract;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Web.Controllers
{
	[Authorize(Policy = "ShowAccessUsers")]
    public class AccessUserController : Controller
    {
		IAccessUsersRepository accessUsersRepository;
		public AccessUserController(IAccessUsersRepository accessUsersRepository)
		{
			this.accessUsersRepository = accessUsersRepository;
		}
		[Route("AccessData")]
		public JsonResult Tables()
		{
			var jsonData = accessUsersRepository.AccessUsers.ToList();
			return Json(jsonData);
		}
    }
}