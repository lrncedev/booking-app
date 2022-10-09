require('dotenv').config()

const express = require('express');
const { v4: uuidv4} = require('uuid');
const path = require('path');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database")); 

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')));

const listingRouter = require('./routes/listings');
app.use('/listings', listingRouter)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req,res) => {
    res.redirect('/listings');
  })

// let listings = [
//   {
//     id: uuidv4(),
//     listingName: 'Bali Innovative Hotel',
//     userName: "baliHotel.org",
//     address: "Bali, indonesia",
//     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
//   },
//   {
//     id: uuidv4(),
//     listingName: 'Kiwi Hotel',
//     userName: "newzealanders.org",
//     address: "South Island, New Zealand",
//     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
//   },
//   {
//     id: uuidv4(),
//     listingName: 'Paris Hotel',
//     userName: "parisian.org",
//     address: "Paris, France",
//     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
//   },
// ];

// // Listing Page
// app.get('/', (req,res) => {
//   res.render('index', { listings });
// })

// //Sign in page
// app.get('/signin', (req,res) => {
//   res.render('signin');
// })

// //Sign up page
// app.get('/signup', (req,res) => {
//   res.render('signup');
// })

// //404 Page
// app.get('*', (req, res) => {
//   res.send('Error');
// })

//Server initiate
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})