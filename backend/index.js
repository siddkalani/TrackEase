const express = require('express');
const app = express();
const cors=require('cors');
const connectTOMongo= require('./db');


const PORT = 5000;

app.use(cors());
app.use(express.json());
connectTOMongo();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/auth',require('../backend/routes/auth') );

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
