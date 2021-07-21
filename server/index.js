const WebSocket = require("ws");
const wss = new WebSocket.Server({
  port: 3000,
});

wss.on("connection", (ws) => {
  console.log("New user connected");
  ws.send("New user connected");

  ws.on("message", (data) => {
    console.log(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});