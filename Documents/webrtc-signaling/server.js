const WebSocket = require("ws");

console.log("Starting signaling server...");

const wss = new WebSocket.Server({ port: 8080 });

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

console.log("✅ Signaling server running on ws://localhost:8080");
