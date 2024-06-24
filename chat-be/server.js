const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        
        // Broadcast message to all clients
        wss.clients.forEach(function each(client) {
            console.log('Sending: %s', message);
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', function () {
        console.log('Client disconnected');
    });
});
