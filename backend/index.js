const connectToMongo = require('./db');
const express = require('express');
let cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

// Use available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Keep-Notes backend listening on port ${port}`);
});
