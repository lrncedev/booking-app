const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req,res) => {
  res.render('index');
})

app.get('*', (req, res) => {
  res.send('Error');
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})