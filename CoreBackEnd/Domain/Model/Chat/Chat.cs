using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Model.Chat
{
	public class Chat
	{
		public int ChatId { get; set; }
		public string UserName { get; set; }
		public string ModeratorName { get; set; }
		public ICollection<Message> Messages { get; set; }
		public bool IsOpen { get; set; }
	}
}
