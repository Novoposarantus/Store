using Domain.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Web.Filters
{
	public class ResponseFilter : IAsyncActionFilter
	{
		readonly IClientRepository clientRepository;
		public ResponseFilter(IClientRepository clientRepository)
		{
			this.clientRepository = clientRepository;
		}

		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			var url = ( (Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.FrameRequestHeaders)( (Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)context.HttpContext.Request ).Headers ).HeaderOrigin.First();
			var check = await this.clientRepository.CheckClient(url);
			if( !check )
			{
				context.Result = new ContentResult()
				{
					Content = "No access."
				};
			}
			await next();
		}
	}
}
