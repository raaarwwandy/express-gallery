/*jshint esversion:6 */

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const gallery = require('./routes/gallery');
const app = express();
const methodOverride = require('method-override');
const CONFIG = require('./config/config');
const gulp = require('gulp');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./models');
let User = db.User;
let Gallery = db.Gallery;

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride('_method'));

app.use(session({
  secret : CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());

app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({
      where: {username: username, 
      password: password}
      })
      .then((user) =>{
      return done(null, user);
      }) .catch ((err) =>{
      return done(null, false, {message: 'Incorrect username.'});
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});


const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'index'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});

app.get('/', (req, res) =>{
  console.log('is this getting there?', req.params.id);
  Gallery.findAll()
  .then((app) =>{
  res.render('gallery/main', {app: app});
  });
});

app.use('/gallery', gallery);

//user 

app.get('/login', (req, res) =>{
  res.render('user/login');
});

app.get('/gallery', isAuthenticated, (req, res) =>{
  res.render('gallery/gallery');
});

app.get('/signup', (req, res) =>{
  res.render('user/makeUser', {'makeUser': req.body});
});

app.post('/signup', (req, res) =>{
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then((user) =>{
    res.redirect(303, `\login`);
  });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));




function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('nope');
    res.redirect('/login');
  }
}

module.exports = app;