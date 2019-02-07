using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Model.Chat
{
	public class Message
	{
		public int MessageId { get; set; }
		public int ChatId { get; set; }
		public string UserName { get; set; }
		public string Text { get; set; }
		public DateTime Time { get; set; }
	}
}
