const express = require('express');
const https = require('https');
const {Server} = require('socket.io');
const path = require('path');
const {getAllMessages, addNewClient, addNewMessage} = require('./src/mongoDb/mongoReq');
const fs = require('fs');

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({key, cert}, app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', async (socket) => {
    try {
        const messagesArray = await getAllMessages();
        socket.emit('initial messages', messagesArray || []);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        socket.emit('initial messages', []);
    }

    socket.on('add client', async (id) => {
        console.log('Creating new client', id);
        const clientId = await addNewClient(id);
        console.log('New client id: ', clientId);
    });

    socket.on('sendMessage', async (messageData) => {
        const clientId = Number(messageData.clientData);
        console.log(messageData);
        const message = messageData.message;
        await addNewMessage(message, clientId);
        await getAllMessages();
        console.log('New message: ', message);
        io.emit('chat message', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
