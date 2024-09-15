import {Author, Book} from "../schemas/schemas.js";
import mongoose from "mongoose";

export const addNewBook = async (authorId ,bookData) => {
    if (typeof bookData === 'object' && authorId) {
        const book = new Book({
            title: bookData.title,
            isbn: bookData.isbn,
            publishedDate: bookData.publishedDate,
            author: authorId,
        });

        const savedBook = await book.save();

        await Author.findByIdAndUpdate(authorId, {
            $push: {books: savedBook._id}
        });
    } else {
        throw new Error('Invalid input data');
    }
};

export const addNewAuthor = async (authorData) => {
    if (typeof authorData === 'object') {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: authorData.name,
            birthDate: authorData.birthDate,
        });

        const savedAuthor = await author.save();
        return {name: savedAuthor.name, id: savedAuthor._id};
    } else {
        throw new Error('Invalid input data');
    }
}