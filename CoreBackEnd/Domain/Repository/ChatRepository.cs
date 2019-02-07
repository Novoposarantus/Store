using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Model.Chat;
using Domain.Abstract;
using System.Text;
using System.Linq;
using Domain.Model;
using System;

namespace Domain.Repository
{
	public class ChatRepository : IChatRepository
	{
		readonly MyDbContext context;
		public ChatRepository(MyDbContext context)
		{
			this.context = context;
		}
		public IQueryable<Chat> Chats => context.Chats.Include(chat => chat.Messages);

		public IQueryable<Chat> GetOpenedChatsWithoutModerator()
		{
			return Chats.Where(chat => chat.IsOpen && chat.ModeratorName == null);
		}
		public async Task<Chat> CloseChat(int chatId)
		{
			var chat = await Chats.FirstOrDefaultAsync(c => c.ChatId == chatId);
			chat.IsOpen = false;
			await context.SaveChangesAsync();
			return chat;
		}
		public async Task<Chat> CreateChat(Chat chat, string firstMessage)
		{
			var savedChat = context.Chats.Add(chat).Entity;
			await context.SaveChangesAsync();
			var message = await AddMessage(firstMessage, savedChat.ChatId, savedChat.UserName);
			savedChat = await Chats.FirstOrDefaultAsync(c => c.ChatId == savedChat.ChatId);
			return savedChat;
		}
		public async Task<Message> AddMessage(string text, int chatId, string userName)
		{
			var message = new Message()
			{
				Text = text,
				ChatId = chatId,
				UserName = userName,
				Time = DateTime.UtcNow
			};
			var savedMessage = context.Messages.Add(message);
			await context.SaveChangesAsync();
			return savedMessage.Entity;
		}
		public async Task<Chat> AddModeratorToChat(string moderatorName, int chatId)
		{
			var moderator = await context.Users.FirstOrDefaultAsync(u => u.UserName == moderatorName);
			var chat = await context.Chats.FirstOrDefaultAsync(c => c.ChatId == chatId);
			chat.ModeratorName = moderator.UserName;
			await context.SaveChangesAsync();
			return chat;
		}
	}
}
