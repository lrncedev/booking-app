const express = require('express');
const router = express.Router();
const User = require('../models/user');

//DEFAULT GET ROUTE
router.get('/', (req,res) => {
  res.redirect('/user/login');
})


// LOGIN GET ROUTE
router.get('/login', (req,res) => {
  res.render('signin');
})

// SIGNUP GET ROUTE
router.get('/signup', (req,res)=> {
  res.render('signup');
})

// Sign up POST ROUTE
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

//Dashboard route


router.get('/dashboard', (req,res) => {
  res.send('dashboard router');
}) 

// DASHBOARD POST ROUTE (GOES HERE AFTER LOGGING IN)
router.post('/dashboard', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;

  /* INCOMPLETE BUT WORKING */
  try {
    const getUser = User.findOne({userName: userName, password: password}, (err, user) => {
      if(err) {
        
        return;
      }
      if (user) {
        // console.log(getUser);
        res.render('dashboard', {getUser, title: "Dashboard"})
      } else {
        console.log("there is no user");
      }
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
})


module.exports = router;

