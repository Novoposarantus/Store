using System;

namespace Domain.Model
{
    public class AccessUser
    {
		public int Id { get; set; }
		public int UserId { get; set; }
		//public string Framework { get; set; }
		public string UserName { get; set; }
		public DateTime Date { get; set; }
		public string NamePage { get; set; }
    }
}
