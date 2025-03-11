// ... (Your existing JavaScript code)

const socket = io(); // Connect to the Socket.IO server

const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('message', message);
        messageInput.value = '';
    }
});

//Example login function.
document.getElementById("loginButton").addEventListener("click", () => {
    //In a real app, send the login information to the backend here.
    showChat();
    //Example user list population.
    const userList = document.getElementById('userList');
    const users = ['User1', 'User2', 'User3']; // Replace with actual user data from backend
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});
