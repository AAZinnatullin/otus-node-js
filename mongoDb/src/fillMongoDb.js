import {addNewAuthor, addNewBook} from "./mongoOperations.js";
import {promises as fs} from "fs";
import {connectDb, disconnectDb} from "../db.js";

const authorsRaw = await fs.readFile('./mongoDb/fixtures/authors.json', 'utf8');
const authors = JSON.parse(authorsRaw);
const booksRaw = await fs.readFile('./mongoDb/fixtures/books.json', 'utf8');
const books = JSON.parse(booksRaw);

await connectDb();

const addDataToMongo = async () => {
    try {
        const authorsData = [];
        // 1. Add all authors
        for (const author of authors) {
            const authorData = await addNewAuthor(author);
            authorsData.push(authorData);
        }

        // 2. Add all books after all authors are added
        for (const book of books) {
            const index = authorsData.map((value) => value.name).indexOf(book.author);
            if (index !== -1) {
                await addNewBook(authorsData[index].id, book);
            } else {
                console.error('Author is not found, need to add author:', book.author, 'for book:', book.title);
            }
        }

    } catch (error) {
        console.error("Error while adding the data:", error);
    } finally {
        // Close the connection with mongoDb
        await disconnectDb();
    }
};

await addDataToMongo();