const express = require('express');
const path = require('path');
const morgan = require('morgan');

let score = 0;

const mongoose = require('mongoose');
const QuestionCard = require('./models/qCard');

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://localhost:27017/trialdb')
    .then(() => {
        console.log("Mongo Connection OPEN!")
    })
    .catch(err => {
        console.log("Oh no Mongo connection ERROR!")
        console.log(err)
    })


app.use(express.static(path.join(__dirname, '/public')))
// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

// app.use(morgan('tiny'));
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next();
// })

// app.use((req, res, next) => {
//     console.log('this is my first middleware');
//     next();
// })

app.get('/', async(req, res) => {
    const cards = await QuestionCard.find({});
    console.log(cards)
    res.render('pages/home',{path:req.path, cards});
})

app.get('/New', (req, res) => {
    res.render('pages/New',{path:req.path});
})

app.post('/questions', async(req, res) => {
    const newQuestion = new QuestionCard(req.body);
    await newQuestion.save();
    res.redirect('/New');
})

app.post('/answers', async(req, res) => {
    const newQuestion = new QuestionCard(req.body);
    let {question: quest, answer} = newQuestion;
    const card = await QuestionCard.findOne({question: 'Largest Bird'});
    const {ans} = card;
    console.log(card)
    console.log(answer)
    console.log(quest)
    if(answer === ans){
        score += 1
    }
    score += 1
    res.redirect('/Quiz');
})

app.get('/Qbank', async(req, res) => {
    const cards = await QuestionCard.find({});
    res.render('pages/Qbank',{path:req.path, cards});
})


app.get('/Quiz', async(req, res) => {
    const cards = await QuestionCard.find({});
    res.render('pages/Quiz',{path:req.path, cards, score});
})

app.get('/Contact', (req, res) => {
    res.render('pages/Contact',{path:req.path});
})

app.get('/About', (req, res) => {
    res.render('pages/About',{path:req.path});
})


app.use((req, res, next) => {
    res.send('error 404, page not found!');
})

app.listen(3000, () =>{
    console.log("listening on port 3000");
})