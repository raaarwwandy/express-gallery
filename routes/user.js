/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
let Users = db.Users;

router.get('/user', (req, res) =>{
  Users.findAll()
  .then((users) =>{
    res.render('gallery/login');
  });
});