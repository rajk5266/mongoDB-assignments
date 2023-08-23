const path = require('path')
const express = require('express');

const contactController = require('../controllers/contactform')
// const successController = require('../controllers/success')

const router = express.Router();

router.get( '/contactus', contactController.form)
  
  // router.post('/contactus',  successController.successful)
  router.post('/contactus', (req, res, next) =>{
    res.redirect('/admin/success')
  })
  module.exports = router