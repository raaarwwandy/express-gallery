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
const RedisStore = require('connect-redis')(
  session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./models');
let User = db.User;
let Gallery = db.Gallery;

const saltRounds = 15; 
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride('_method'));

app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat', 
  resave: false, 
  saveUnintialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

function checkPassword(plainTextPassword, passwordInDb){
  return bcrypt.compare(plainTextPassword, passwordInDb, function(err, res){
    return res;
  });
}

passport.use(new LocalStrategy (
  function(username, password, done){
    User.findOne({
      where : {
        username : username
      }
    }).then(user =>{
      if(user === null){
        console.log('user failed')
        return done(null, false, {message: 'bad password'})
      } else {

        bcrypt.compare(password, user.password).then(res =>{
          if (res) {
            return done(null, user);
          } else { 
            return done(null, false, {message: 'bad password'})
          }
        })
      }
    }).catch(err => {
      console.log('error: ', err)
    })
    }

  ))




passport.serializeUser(function(user, done) {
  return done(null, { 
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user =>{
    return done(null, user);
  });
});


const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(express.static('public'));

  

app.get('/', (req, res) =>{
  let username ;
  if(req.user){
    username = req.user.username;
  } else {
    username = null;
  }
  Gallery.findAll()
  .then((app) =>{
  res.render('./index', {
    gallery: app,
    username: username,
     });
  });
});

app.use('/gallery', gallery);

//user 

app.get('/login', (req, res) =>{
  res.render('user/login');
});


app.get('/signup', (req, res) =>{
  res.render('user/makeUser', {'makeUser': req.body});
});

app.get('/logout', function(req, res){

  req.logOut(); 
  res.redirect('/');
});

app.post('/signup', (req, res) =>{
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      console.log('hash', hash);
          User.create({
          username: req.body.username,
          password: hash
        })
        .then((user) =>{
          res.redirect(303, `\login`);
        });
      });
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

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;