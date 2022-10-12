require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database")); 

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')));

const listingRouter = require('./routes/listings');
const userRouter = require('./routes/users');

app.use('/listings', listingRouter);
app.use('/user', userRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req,res) => {
    res.redirect('/listings');
})
  
//Server initiate
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})