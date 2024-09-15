const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My HW-6 API',
        version: '1.0.0',
        description: 'My HW-6 API Description',
    },
    servers: [{
        url: 'http://localhost:3002',
        description: 'Development local server, running on port 3002',
    }],
};

const options = {
    swaggerDefinition,
    apis: ['./restApi/routes/books.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;