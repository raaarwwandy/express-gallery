/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Gallery = db.Gallery;

router.get('/', (req, res) =>{
  console.log('hope this hits', req.params.id);
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
    res.redirect(303, `/gallery/photo/${gallery.id}`);
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

router.put('/:id/edit', (req, res) =>{
  
})





module.exports = router;