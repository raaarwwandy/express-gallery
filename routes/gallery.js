/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Gallery = db.Gallery;

router.get('/', (req, res) =>{
  console.log('this reders all the galleres');
  Gallery.findAll()
  .then((gallery) => {
  res.render('gallery/gallery', {gallery: gallery});
  });
});

router.post('/', (req, res) =>{
  console.log('post has been sucessful', req.body);
  Gallery.create({ 
    author : req.body.author, 
    link : req.body.link, 
    description: req.body.description
  })
  .then((gallery) => {
    res.redirect(303, `/gallery/${gallery.id}`);
  });
});



router.get('/new', (req, res) =>{
  console.log('this is making a post');
  res.render('gallery/new', {'postForm': req.body});
});

//get element by id 

router.get('/:id', (req, res) =>{
  Gallery.findOne({
    where : {id: req.params.id}
  })
  .then((photo) => {
    res.render('gallery/photo', {'gallery': photo});
  });
});


router.get('/:id/edit', (req, res) =>{
  console.log('this should pull up the edit page');
  Gallery.findOne({
    where : {id: req.params.id}
  })
  .then((photo) =>{
    res.render('gallery/edit', {'gallery': photo});
  });
});

router.put('/:id', (req, res) =>{
  console.log('this upated id',req.params);
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





module.exports = router;