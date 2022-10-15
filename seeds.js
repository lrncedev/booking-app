const mongoose = require('mongoose');
const Listing = require('./models/listing');
const User = require('./models/user');


mongoose.connect('mongodb://localhost:27017/bookingApp')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const seedListings = [
    {
        listingName: 'Hotel Tripadvisoryago',
        userName: 'budgettraveller321',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta laboriosam magni quisquam error!',
        reviews: [
          "Place is good", 
          "The Casino Royale is hidden between Harrah's and The Venetian. It is perfectly placed to attend a trade show at the Sand Convention Center behind the Venetian without paying the high Venetian price. The lobby is an old well worn nondescript casino that of course reeks of cigarettes. Once checked in, you pass through a card-controlled sliding glass door and into the hotel itself.My room was big, clean, and comfortable. The only downside was the do",
          "The casino was located in the centre of the Vegas strip. The staff were friendly and made you feel welcome. I would recommend this property for anyone needing good accommodation without resort fees."
        ]
    },
    {
      listingName: 'Best Western Plus Casino Royale',
      userName: 'westercasinoroyal',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta laboriosam magni quisquam error!',
      reviews: [
        "Place is good", 
        "The Casino Royale is hidden between Harrah's and The Venetian. It is perfectly placed to attend a trade show at the Sand Convention Center behind the Venetian without paying the high Venetian price. The lobby is an old well worn nondescript casino that of course reeks of cigarettes. Once checked in, you pass through a card-controlled sliding glass door and into the hotel itself.My room was big, clean, and comfortable. The only downside was the do",
        "The casino was located in the centre of the Vegas strip. The staff were friendly and made you feel welcome. I would recommend this property for anyone needing good accommodation without resort fees."
      ]
    },
    {
      listingName: 'The Venetian Resort Las Vegas',
      userName: 'venetianlasvegas',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta laboriosam magni quisquam error!',
      reviews: [
        "Place is good", 
        "The Casino Royale is hidden between Harrah's and The Venetian. It is perfectly placed to attend a trade show at the Sand Convention Center behind the Venetian without paying the high Venetian price. The lobby is an old well worn nondescript casino that of course reeks of cigarettes. Once checked in, you pass through a card-controlled sliding glass door and into the hotel itself.My room was big, clean, and comfortable. The only downside was the do",
        "The casino was located in the centre of the Vegas strip. The staff were friendly and made you feel welcome. I would recommend this property for anyone needing good accommodation without resort fees."
      ]
    },
]

const seedUser = [
  {
    userName: 'user123',
    password: 'test123'
  },
  {
    userName: 'user',
    password: 'pass'
  },
]


Listing.insertMany(seedListings)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })

User.insertMany(seedUser)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })