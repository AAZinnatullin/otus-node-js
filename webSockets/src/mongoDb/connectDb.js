const mongoose = require('mongoose');

const url = 'mongodb://localhost:53924/?directConnection=true';
const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log(`Database is connected for ${url}`);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log('Database is disconnected');
    } catch (err) {
        console.error('Error disconnecting the database:', err);
        process.exit(1);
    }
};

module.exports = {
    connectDb,
    disconnectDb,
}