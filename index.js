const express = require('express');
const { v4: uuidv4} = require('uuid');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let listings = [
  {
    id: uuidv4(),
    listingName: 'Bali Innovative Hotel',
    userName: "baliHotel.org",
    address: "Bali, indonesia",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
  },
  {
    id: uuidv4(),
    listingName: 'Kiwi Hotel',
    userName: "newzealanders.org",
    address: "South Island, New Zealand",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
  },
  {
    id: uuidv4(),
    listingName: 'Paris Hotel',
    userName: "parisian.org",
    address: "Paris, France",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus tempore consequuntur sed amet."
  },
];

// Listing Page
app.get('/', (req,res) => {
  res.render('index', { listings });
})

//Sign in page
app.get('/signin', (req,res) => {
  res.render('signin');
})

//Sign up page
app.get('/signup', (req,res) => {
  res.render('signup');
})

//404 Page
app.get('*', (req, res) => {
  res.send('Error');
})

//Server initiate
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})