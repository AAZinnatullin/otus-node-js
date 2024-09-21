const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    localId: Number,
});

const messagesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: {
        type: String,
        required: true,
    },
    clientId: {
        type: Number,
        ref: 'clients',
        required: true,
    },
});

const Clients = mongoose.model('clients', clientsSchema);
const Messages = mongoose.model('messages', messagesSchema);

module.exports = {
    Clients,
    Messages,
};