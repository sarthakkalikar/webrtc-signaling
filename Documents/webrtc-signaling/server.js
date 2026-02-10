const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", ws => {
  clients.push(ws);
  console.log("Client connected. Total:", clients.length);

  ws.on("message", msg => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
    console.log("Client disconnected. Total:", clients.length);
  });
});

server.listen(PORT, () => {
  console.log("✅ Signaling server running on port", PORT);
});
