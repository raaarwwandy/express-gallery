/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Gallery = db.Gallery;

router.get('/',(req, res) =>{
  res.redirect('/');
}); 

router.post('/', isAuthenticated, (req, res) =>{
  Gallery.create({ 
    author : req.body.author, 
    link : req.body.link, 
    description: req.body.description
  })
  .then((gallery) => {
    res.redirect(303, `/gallery/${gallery.id}`);
  });
});



router.get('/new', isAuthenticated, (req, res) =>{
  res.render('gallery/new', {'postForm': req.body});
});



router.get('/:id', (req, res) =>{
  Gallery.findOne({
    where : {id: req.params.id}
  })
  .then((photo) => {
    res.render('gallery/photo', {'gallery': photo});
  });
});


router.get('/:id/edit',isAuthenticated, (req, res) =>{
  Gallery.findOne({
    where : {id: req.params.id}
  })
  .then((photo) =>{
    res.render('gallery/edit', {'gallery': photo});
  });
});

router.put('/:id', isAuthenticated, (req, res) =>{
  Gallery.update({
    author : req.body.author, 
    link : req.body.link, 
    description: req.body.description
  }, {
    where : {id :req.params.id}
  })
  .then((photo) =>{
    res.redirect(303, `/gallery/${req.params.id}`);
  });
});

router.delete('/:id',isAuthenticated, (req, res) =>{
  Gallery.destroy({
    where : {id: req.params.id}
  })
  .then((photo) =>{
    res.redirect(303, '/gallery');
  });
});


function isAuthenticated(req, res, next){
  console.log('USER IS LOGGED IN');
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('USER HAS LOGGED OUT');
    res.redirect('/login');
  }
}


module.exports = router;