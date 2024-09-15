import {Book, Author} from "../schemas/schemas.js";

import {connectDb, disconnectDb} from "../db.js";

await connectDb();

const doRequests = async () => {
    try {

// Find all books
        const allBooks = await Book.find({});
        console.log('All books', allBooks, '\n');

// Find all authors
        const allAuthors = await Author.find({});
        console.log('All authors', allAuthors, '\n');

// Find all books from author
        await Author.findOne({name: 'J.R.R. Tolkien'}).populate('books').then(p => {
            console.log('All books from J. R.R. Tolkien: ', {author: p.name, books: {title: p.books.map(b => b.title)}}, '\n');
        });

// Find all authors from book
        await Book.findOne({title: 'The Hobbit'}).populate('author').then(p => {
            console.log('Author of The Hobbit: ', {book: p.title, author: {name: p.author.name}}, '\n');
        });

// Update author
        await Author.updateOne({name: 'J.K. Rowling'}, {name: 'Joanne Rowling'});
        // Find updated author
        const updatedAuthor = await Author.findOne({name: 'Joanne Rowling'});
        console.log('Updated author: ', updatedAuthor, '\n');

// Update book
        await Book.updateOne({isbn: '978-3-16-148419-3'}, {isbn: '978-3-16-148419-34'});
        // Find updated book
        const updatedBook = await Book.findOne({isbn: '978-3-16-148419-34'});
        console.log('Updated book: ', updatedBook, '\n');
    } catch (e) {
        throw new Error(`Impossible to do requests: ${e}`);
    } finally {
        // Close the connection with mongoDb
        await disconnectDb();
    }
};

await doRequests();