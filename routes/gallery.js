/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Gallery = db.Gallery;

router.get('/', (req, res) =>{
  Gallery.findAll()
  .then(function(gallery){
  res.render('gallery/gallery', {gallery: gallery});
  });
});

router.post('/', (req, res) =>{
  Gallery.create({ 
    author : req.body.author, 
    link : req.body.link, 
    description: req.body.description
  })
  .then(function(gallery){
    // console.log(gallery);
    res.redirect(303, '/gallery');
  });
});


router.get('/new', (req, res) =>{
  res.render('gallery/new', {'postForm': req.body});
});

module.exports = router;