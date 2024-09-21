// const socket = new WebSocket('wss://localhost:4000');
const socket = io();

const textarea = document.getElementById('form');
const messages = document.getElementById('messages');
const button = document.getElementById('send');
let clientId = '';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function notifyMe(msg) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification(msg);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(msg);
            }
        });
    }
}

const addMessageToDOM = (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
}

socket.on('connect', () => {
    const clientId = getRandomInt(1000);
    console.log('Connected to server', clientId);
    socket.emit('add client', clientId);
    localStorage.setItem('clientId', clientId.toString());
});

button.addEventListener('click', () => {
    console.log('button clicked');
    console.log(textarea.value);
    if (textarea?.value) {
        const clientData = localStorage.getItem('clientId');
        const messageData = {message: textarea.value.trim(), clientData};
        socket.emit('sendMessage', messageData);
        document.getElementById('form').value = '';
    }
});

socket.on('chat message', async (msg) => {
    const message = msg.message
    const clientId = msg.clientData
    const currentClientId = localStorage.getItem('clientId')
    console.log(clientId, currentClientId, 'test');
    // window.alert('New message for you: ' + message);
    if (clientId !== currentClientId) {
        notifyMe(message);
    }
    addMessageToDOM(message);
});

socket.on('initial messages', (messagesArray) => {
    messages.innerHTML = '';

    messagesArray.forEach((messageObj) => {
        addMessageToDOM(messageObj.message);
    });
});
