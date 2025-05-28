const express = require('express');
const app = express();
const router = require('./routes/url');
const connectDB = require('./connection');

connectDB('mongodb://localhost:27017/urlShortener')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/url',router);

app.listen(8000,()=>console.log('Server is running on port 8000'));