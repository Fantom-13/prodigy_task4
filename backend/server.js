const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('send-message', ({ room, message, sender }) => {
    io.to(room).emit('receive-message', { message, sender });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
