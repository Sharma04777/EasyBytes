const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json()); // Add middleware to parse JSON requests

const users = {}; // In-memory user storage (replace with a database in production)

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).send('Username already exists');
    }
    users[username] = { password }; // Store user (hash passwords in production)
    res.send('User registered');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.status(401).send('Invalid credentials');
    }
    res.send('Login successful');
});

io.on('connection', (socket) => {
    let username;

    socket.on('login', (data) => {
        username = data.username;
        console.log(`${username} connected`);
        io.emit('userConnected', username);
    });

    socket.on('message', (message) => {
        if (username) {
            const messageWithUser = { username: username, content: message };
            console.log('Received message:', messageWithUser);
            io.emit('message', messageWithUser);
        }
    });

    socket.on('disconnect', () => {
        if (username) {
            console.log(`${username} disconnected`);
            io.emit('userDisconnected', username);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
