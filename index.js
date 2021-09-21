const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/New', (req, res) => {
    res.render('New');
})

app.get('/Quiz', (req, res) => {
    res.render('Quiz');
})

app.get('/Contact', (req, res) => {
    res.render('Contact');
})

app.get('/About', (req, res) => {
    res.render('About');
})

app.listen(3000, () =>{
    console.log("listening on port 3000");
})