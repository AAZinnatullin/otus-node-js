const express = require('express');
const router = require('./routes/authorization.js');

const app = express();
const PORT = 3003;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});