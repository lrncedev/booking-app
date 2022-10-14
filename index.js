//Dependecies
require('dotenv').config()

const express = require('express');
const session = require('express-session');
const methodOverride  = require('method-override');
const path = require('path');

//DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database")); 


//Models
const Listing = require('./models/listing');
const User = require('./models/user');
const { isFloat64Array } = require('util/types');
// const listing = require('./models/listing');


const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret:"secret", resave:false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

//Templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


//Routes
app.get('/', (req,res) => {
  res.render('login', {title: "Login"})
})


app.get('/login', (req,res) => {
  res.render('login', {title: "Login"})
})

app.get('/signup', (req,res) => {
  res.render('signup', {title: "Register"});
})

app.post('/signup', (req,res) => {
  res.render('signup', {title: "Register"});
})


app.post('/login', (req,res) => {
  let uName = req.body.userName;
  let pWord = req.body.password;

  User.findOne({userName: uName, password: pWord}, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }

    if(!user) {
      return res.redirect('/');
    }

    req.session.user = user; 
    return res.redirect('/dashboard')
  })
})

app.get('/dashboard', async(req,res) => {
  if(!req.session.user) {
    return res.redirect('/');
  }
  const listings = await Listing.find();
  return res.render('dashboard', {title: "test", listings});
}) 


app.get('/listings', async(req,res) => {
  // const listings = await Listing.find();
  if(!req.session.user) {
    const listings = await Listing.find();
    res.render('landing', {title: "Available hotels", listings});
  }
  const listings = await Listing.find();
  res.render('listings', {title: "Available Hotels", listings})
})

//GET ONE HOTEL
app.get('/listings/:id/update', async(req,res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render('edit', {title: "Update listing", listing});
}) 

app.put('/listings/:id', async (req, res) => {
  const {id} = req.params;
  console.log(req.body);
  const listing = await Listing.findByIdAndUpdate(id, 
    { 
      listingName: req.body.listingName,
      userName: req.body.userName,
      description: req.body.description,
      address: req.body.address
    });
  res.redirect('/dashboard');
})


app.delete('/listings/:id', async(req,res) => {
  const {id} = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  res.redirect('/dashboard')
})

app.get('/listings/:id', async(req,res) => {
  const {id} = req.params; 
  const listing = await Listing.findById(id);
  if(!req.session.user) {
    res.render('list', { listing , title: "Hotel"});
  }
  else {
    res.render('authoredList', { listing , title: "Hotel"});
  }
})

app.get('/logout', (req,res) => {
  req.session.destroy();
  return res.redirect('/');
})

app.post('/register', async (req,res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password
  })

  const newUser = await user.save();
  res.redirect('/login');
})


app.get('/host', (req,res) => {
  res.render('host', {title: "Be a host"});
})

app.post('/hostBnb', async(req,res) => {
  const listing = new Listing({
    listingName: req.body.listingName,
    userName: req.body.userName,
    description: req.body.description,
    address: req.body.address
  })

  try {
    const newListing = await listing.save()

    res.redirect('/dashboard')
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

async function getListing(req, res, next) {
  let listing
  try {
    listing = await Listing.findById(req.params.id)
    if(listing == null) {
      return res.status(404).json({message: 'Cannot find that listing'})
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.listing = listing
  next()
}


//PORT LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})