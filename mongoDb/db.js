import mongoose from 'mongoose';

const url = 'mongodb://localhost:57884/?directConnection=true';
export const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log(`Database is connected for ${url}`);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log('Database is disconnected');
    } catch (err) {
        console.error('Error disconnecting the database:', err);
        process.exit(1);
    }
};
