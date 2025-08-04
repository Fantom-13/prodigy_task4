const socket = io('http://localhost:3000');
let currentRoom = "";
let currentUser = "";

function joinRoom() {
  currentUser = document.getElementById('username').value;
  currentRoom = document.getElementById('room').value;
  socket.emit('join-room', currentRoom);
}

function sendMessage() {
  const msg = document.getElementById('message').value;
  socket.emit('send-message', { room: currentRoom, message: msg, sender: currentUser });
  document.getElementById('message').value = '';
}

socket.on('receive-message', ({ message, sender }) => {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${message}`;
  document.getElementById('chatbox').appendChild(div);
});
