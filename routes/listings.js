const express = require('express');
const router = express.Router();
const Listing = require('../models/listing')

// GET ALL listings
router.get('/', async (req,res) => {
  try {
    const listings = await Listing.find()
    // res.json(listings)
    res.render('index', { listings });
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})
  // router.get('/signin', (req,res)=> {
  //   res.render('signin');
  // })


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