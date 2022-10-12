const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user');


// GET ALL listings
router.get('/', async (req,res) => {
  try {
    const listings = await Listing.find()
    // res.json(listings)
    res.render('index', { listings, title: "Booking App"});
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// Sign In 
// router.get('/signin', (req,res)=> {
//   res.render('signin');
// })

// router.get('/signup', (req,res)=> {
//   res.render('signup');
// })

// Dashboard
// router.post('/dashboard', (req, res) => {
//   let userName = req.body.userName;
//   let password = req.body.password;

//   /* INCOMPLETE BUT WORKING */
//   try {
//     const getUser = User.findOne({userName: userName, password: password}, (err, user) => {
//       if(err) {
        
//         return;
//       }
//       if (user) {
//         // console.log(getUser);
//         res.render('dashboard', {getUser, title: "Dashboard"})
//       } else {
//         console.log("there is no user");
//       }
//     });
//   } catch (error) {
//     res.status(400).json({message: error.message});
//   }
  
// })




//Sign up 
router.post('/signup', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password
  })

  try {
    const newUser = await user.save();
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})



  // GET ONE listing
router.get('/:id', getListing, (req,res) => {
  // res.json(res.listing)
  const listing = res.listing;
  res.render('list', { listing });
})

// creating one
router.post('/', async (req,res) => {
  const listing = new Listing({
    listingName: req.body.listingName,
    userName: req.body.userName,
    description: req.body.description
  })

  try {
    const newListing = await listing.save()
    console.log(newListing);
    res.status(201).json(newListing)
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

//updating one
router.patch('/:id', getListing, async (req,res) => {
  if(req.body.listingName != null) {
    res.listing.listingName = req.body.listingName
  }
  if(req.body.userName != null) {
    res.listing.userName = req.body.userName
  }
  if(req.body.description != null) {
    res.listing.description = req.body.description
  }

  try {
    const updatedListing = await res.listing.save();
    res.json(updatedListing);
  }catch(error) {
    res.status(400).json({message: error.message})

  }
})


//deleting one
router.delete('/:id', getListing, async (req,res) => {
  try {
    await res.listing.remove()
    res.json( {message: "Deleted the listing"})
  } catch (error) {
    res.status(500).json( {message: error.message})
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

module.exports = router;