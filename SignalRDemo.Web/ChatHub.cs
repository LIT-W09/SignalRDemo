using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRDemo.Web
{
    public class Foo
    {
        public int Amount { get; set; }
    }

    public class ChatMessage
    {
        public string Message { get; set; }
    }

    public class ChatHub : Hub
    {
        private static List<string> _messages = new();
        private static int _currentUserCount = 0;

        private string _connectionString;

        public ChatHub(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Default");
        }

        public void Test(Foo foo)
        {
            Clients.All.SendAsync("test-message", new { guids = Enumerable.Range(1, foo.Amount).Select(_ => Guid.NewGuid()) });
        }

        public void NewMessage(ChatMessage message)
        {
            //Context.User.Identity.Name  - get currently logged in user
            _messages.Add(message.Message);
            Clients.All.SendAsync("newMessage", _messages);
        }

        public void NewUser()
        {
            Clients.Caller.SendAsync("newMessage", _messages);
            _currentUserCount++;
            Clients.All.SendAsync("newUser", new { count = _currentUserCount });
        }
    }
}
