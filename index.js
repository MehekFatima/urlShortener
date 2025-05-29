const express = require('express');
const app = express();
const router = require('./routes/url');
const connectDB = require('./connection');
const path = require('path');
const staticRouter = require('./routes/StaticRoutes');

connectDB('mongodb://localhost:27017/urlShortener')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use('/url',router);
app.use('/',staticRouter);

app.listen(8000,()=>console.log('Server is running on port 8000'));