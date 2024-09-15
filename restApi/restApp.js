const swaggerUi = require('swagger-ui-express');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/books.js');
const swaggerSpec = require('./swagger.js');

const app = express();
app.use(bodyParser.json());
app.use(router);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
);

app.listen(3002, () => console.log('Server is running on http://localhost:3002'));