using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Hubs.HubModels
{
	public class NewMessage
	{
		public int ChatId { get; set; }
		public string UserNameTo { get; set; }
		public string Text { get; set; }
	}
}
