using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRDemo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _context;

        public SampleController(IHubContext<ChatHub> context)
        {
            _context = context;
        }

        [Route("getdata")]
        [HttpGet]
        public object GetData()
        {
            _context.Clients.All.SendAsync("guidRequested");
            return new { value = Guid.NewGuid() };
        }
    }
}
