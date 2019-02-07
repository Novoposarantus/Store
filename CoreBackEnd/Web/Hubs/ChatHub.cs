using Domain.Abstract;
using Domain.Model.Chat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Hubs.HubModels;

namespace Web.Hubs
{
	[Authorize]
	public class ChatHub : Hub
	{
		readonly IUserRepository userRepository;
		readonly IPermissionRepository permissionRepository;
		readonly IChatRepository chatRepository;
		public ChatHub(	IUserRepository userRepository,
						IPermissionRepository permissionRepository,
						IChatRepository chatRepository)
		{
			this.userRepository = userRepository;
			this.permissionRepository = permissionRepository;
			this.chatRepository = chatRepository;
		}

		public async Task Send(NewMessage sendedMessage)
		{
			var message = await chatRepository.AddMessage(sendedMessage.Text, sendedMessage.ChatId, Context.User.Identity.Name);
			await Clients.Users(Context.User.Identity.Name, sendedMessage.UserNameTo).SendAsync("Recived", message);
		}
		public async Task StartChat(string messageText)
		{
			var users = userRepository.Users.ToArray();
			var loginedUser = userRepository.Users.FirstOrDefault(user => user.UserName == Context.User.Identity.Name);
			var usersRequesting = users.Where(user => permissionRepository.CheckPermission(user, "ChatModerating")).Select(user => user.UserName).ToList();
			usersRequesting.Add(loginedUser.UserName);
			var chat = await chatRepository.CreateChat(new Chat()
			{
				UserName = loginedUser.UserName,
				IsOpen = true,
			}, messageText);
			await Groups.AddToGroupAsync(loginedUser.UserName, GetChatName(chat.ChatId));
			await Clients.Users(usersRequesting).SendAsync("AddNewChat", chat);
		}
		public async Task SetModerator(int chatId)
		{
			var chat = await chatRepository.AddModeratorToChat(Context.User.Identity.Name, chatId);
			var users = userRepository.Users.ToArray();
			var clients = users
											.Where(user => permissionRepository.CheckPermission(user, "ChatModerating") || user.UserName == chat.UserName)
											.Select(user => user.UserName)
											.ToList();
			await Groups.AddToGroupAsync(chat.ModeratorName, GetChatName(chat.ChatId));
			await Clients.Users(clients).SendAsync("ModeratorSet", chat);
		}
		public async Task CloseChat(int chatId)
		{
			var chat = await chatRepository.CloseChat(chatId);
			var groupName = GetChatName(chatId);
			await Clients.Users(chat.UserName, chat.ModeratorName).SendAsync("CloseChat", chatId);
		}
		private string GetChatName(int chatId)
		{
			return "chat" + chatId.ToString();
		}
	}
}
