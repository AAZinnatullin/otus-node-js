import mongoose, {Schema} from "mongoose";

const date = new Date();

const authorSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required'],
        max: date,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'hw-books',
    }]
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    publishedDate: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'hw-authors',
        required: true,
    },
});

export const Author = mongoose.model('hw-authors', authorSchema);
export const Book = mongoose.model('hw-books', bookSchema);