using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Web.Controllers
{
	[Authorize]
	public class ChatController : Controller
	{
		readonly IChatRepository chatRepository;
		readonly IUserRepository userRepository;

		public ChatController(IChatRepository chatRepository, IUserRepository userRepository)
		{
			this.chatRepository = chatRepository;
			this.userRepository = userRepository;
		}
		public async Task<JsonResult> GetChat()
		{
			var chat = await chatRepository.Chats.FirstOrDefaultAsync(c => c.UserName == HttpContext.User.Identity.Name && c.IsOpen);
			return Json(chat);
		}
		[Authorize(Policy = "ChatModerating")]
		public JsonResult GetOpenedChats()
		{
			var chats = chatRepository.Chats.Where(chat => chat.IsOpen 
			&& (chat.ModeratorName == HttpContext.User.Identity.Name
				|| chat.ModeratorName == null)).ToList();
			return Json(chats);
		}
	}
}