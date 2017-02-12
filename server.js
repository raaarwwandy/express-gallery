/*jshint esversion:6 */

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const gallery = require('./routes/gallery');
const app = express();
const db = require('./models');
let Gallery = db.Gallery;
app.use(bodyParser.urlencoded({ extended: true}));

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'index'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.listen(3000, function() {
  console.log('sever started');
  db.sequelize.sync();
});

app.get('/', (req, res) =>{
  res.render('layouts/index', Gallery);
});

app.use('/gallery', gallery);

module.exports = app;