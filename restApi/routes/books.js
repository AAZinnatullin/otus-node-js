const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

const books = [];
let idCounter = 0;

router.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *   - name: books
 *     description: Operations with books
 *   - name: booksById
 *     description: Operations with books by Id
 */


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Get all books from the library
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: A list of books
 *         tags:
 *          - books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   isbn:
 *                     type: integer
 *                     description: Uniquely identifies for the book
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The book title
 *                     example: The Great Gatsby
 *                   author:
 *                     type: string
 *                     description: Written by
 *                     example: F. Scott Fitzgerald
 *                   id:
 *                     type: integer
 *                     description: The book ID
 *                     example: 0
 *       404:
 *          description: No books found
*/
router.get('/books', (req, res) => {
    if (books.length === 0) {
        res.status(404).send('No books found');
    } else {
        res.status(200).send(books);
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - booksById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         type: integer
 *     description: Get a book from the library by its ID
 *     responses:
 *       200:
 *         description: A book by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isbn:
 *                   type: integer
 *                   description: Uniquely identifies for the book
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The book title
 *                   example: The Great Gatsby
 *                 author:
 *                   type: string
 *                   description: Written by
 *                   example: F. Scott Fitzgerald
 *                 id:
 *                   type: integer
 *                   description: The book ID
 *                   example: 0
 *       404:
 *         description: Book {id} was not found
*/
router.get('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send(`Book ${req.params.id} was not found`);
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the library and returns the ID of the created book.
 *     tags:
 *       - books
 *     requestBody:
 *       description: The book to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book title
 *                 example: The Great Gatsby
 *                 required: true
 *               author:
 *                 type: string
 *                 description: Written by
 *                 example: F. Scott Fitzgerald
 *                 required: true
 *               isbn:
 *                 type: integer,
 *                 description: Uniquely identifies for the book
 *                 example: 1
 *                 required: true
 *     responses:
 *       201:
 *         description: Book was created successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: The book ID
 *                  example: 1
 *       400:
 *         description: Invalid input, request should contain body with - title, isbn, author
 */
router.post('/books', (req, res) => {
    if (req.body && req.body?.title && req.body?.isbn && req.body?.author) {
        const book = req.body;
        book.id = idCounter++;
        books.push(book);
        res.status(201).send({id: book.id});
    } else {
        res.status(400).send('Invalid input, request should contain body with: title, isbn, author');
    }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags:
 *       - booksById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         type: integer
 *     description: Delete a book from the library by its ID
 *     responses:
 *       204:
 *         description: Book was deleted successfully
 *       404:
 *         description: Book {id} is not found
 */
router.delete('/books/:id', (req, res) => {
    const index = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`Book ${req.params.id} is not found`);
    }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags:
 *       - booksById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         type: integer
 *     description: Update a book from the library by its ID
 *     requestBody:
 *       description: The book to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book title
 *                 example: The Great Gatsby
 *                 required: true
 *               author:
 *                 type: string
 *                 description: Written by
 *                 example: F. Scott Fitzgerald
 *                 required: true
 *               isbn:
 *                 type: integer,
 *                 description: Uniquely identifies for the book
 *                 example: 1
 *                 required: true
 *     responses:
 *       200:
 *         description: Book was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isbn:
 *                   type: integer
 *                   description: Uniquely identifies for the book
 *                   example: 1
 *                   required: true
 *                 author:
 *                   type: string
 *                   description: Written by
 *                   example: F. Scott Fitzgerald
 *                   required: true
 *                 title:
 *                   type: string
 *                   description: The book title
 *                   example: The Great Gatsby
 *                   required: true
 *       404:
 *         description: Book {id} is not found
 *       400:
 *         description: Invalid input, request should contain body with - title, isbn, author
 */
router.put('/books/:id', (req, res) => {
    if (req.body && req.body?.title && req.body?.isbn && req.body?.author) {
        const body = req.body;
        delete body.id;

        const index = books.findIndex((b) => b.id === parseInt(req.params.id));

        if (index !== -1) {
            books[index] = {...books[index], ...body};
            res.status(200).send(books[index]);
        } else {
            res.status(404).send(`Book ${req.params.id} is not found`);
        }
    } else {
        res.status(400).send('Invalid input, request should contain body with: title, isbn, author');
    }
});

module.exports = router;