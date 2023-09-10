const http = require('http').createServer();
const port = 3000;

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.join('default');
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`)
    });
});

http.listen(port, () => {
    console.log(`HTTP server is running on port ${port}`);
});