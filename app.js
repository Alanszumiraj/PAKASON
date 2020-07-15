const express = require('express');
const app = express();
const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');

const session= require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const recordameMW = require ('./middlewares/recordameMW');

// Template Engine 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'secreto',resave: false,
saveUninitialized: true,}));
app.use(cookieParser());    
app.use(recordameMW);

app.listen(3000, function(){
    console.log('Running on 3000');
});

app.use('/', homeRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/contact',contactRouter);




