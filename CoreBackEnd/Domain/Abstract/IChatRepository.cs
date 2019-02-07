using Domain.Model.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
	public interface IChatRepository
	{
		IQueryable<Chat> Chats { get; }
		IQueryable<Chat> GetOpenedChatsWithoutModerator();
		Task<Chat> CloseChat(int chatId);
		Task<Chat> CreateChat(Chat chat, string firstMessage);
		Task<Message> AddMessage(string text, int chatId, string userName);
		Task<Chat> AddModeratorToChat(string moderatorId, int chatId);
	}
}
