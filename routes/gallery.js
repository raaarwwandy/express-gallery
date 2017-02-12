/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Gallery = db.Gallery;

router.post('/', (req, res) =>{
  Gallery.create({ author : req.body.author, title : req.body.title})
  .then(function(gallery){
    console.log(gallery);
    res.render('gallery/gallery', {Gallery});
  });
});



module.exports = router;