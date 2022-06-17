# SignalRDemo

To get started with SignalR, create a class in the root of the application that inherits from Hub. Here's a sample:

https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/ChatHub.cs#L20

You'll then need to make sure to add the two following lines in the `Startup.cs` class:

https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/Startup.cs#L25

https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/Startup.cs#L56 (on this line you don't have to use `/chat`, you can use any URL you want)

Then, install the following npm package in your client app:

`npm install @microsoft/signalr`

Some additional notes: 

To use SignalR outside of the hub: https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/Controllers/SampleController.cs#L13-L29

To get the currently logged in user in the Hub: https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/ChatHub.cs#L39

To get the connection string in the hub: https://github.com/LIT-W09/SignalRDemo/blob/master/SignalRDemo.Web/ChatHub.cs#L27-L30
