/*jshint esversion:6 */

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const gallery = require('./routes/gallery');
const app = express();
const db = require('./models');
const methodOverride = require('method-override');
let Gallery = db.Gallery;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'index'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

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

module.exports = app;