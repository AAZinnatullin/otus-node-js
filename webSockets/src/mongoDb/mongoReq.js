const { Clients, Messages } = require('./schemas/schema');
const { connectDb, disconnectDb } = require('./connectDb');
const mongoose = require('mongoose');

const getAllMessages = async () => {
    try {
        await connectDb();
        const messages = await Messages.find({}, { message: 1, _id: 0, clientId: 1 }).exec();
        console.log('All messages: ', messages, '\n');
        return messages;
    } catch (e) {
        throw new Error(`Impossible to get all messages: ${e}`);
    } finally {
        await disconnectDb();
    }
};

const addNewClient = async (id) => {
    try {
        await connectDb();
        const newClient = new Clients({
            _id: new mongoose.Types.ObjectId(),
            localId: id,
        });
        await newClient.save();
        console.log('New client added: ', newClient, '\n');
        return newClient._id;
    } catch (e) {
        throw new Error(`Impossible to add new client: ${e}`);
    } finally {
        await disconnectDb();
    }
};

const addNewMessage = async (message, clientId) => {
    try {
        await connectDb();
        const newMessage = new Messages({
            _id: new mongoose.Types.ObjectId(),
            message,
            clientId: clientId,
        });
        await newMessage.save();
        console.log('New message added: ', newMessage, '\n');
    } catch (e) {
        throw new Error(`Impossible to add new message: ${e}`);
    } finally {
        await disconnectDb();
    }
};

module.exports = {
    getAllMessages,
    addNewClient,
    addNewMessage,
};