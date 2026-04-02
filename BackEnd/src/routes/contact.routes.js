const express = require('express');
const { contact } = require('../controller/contact.controllers');
const router = express.Router();

router.post('/email',contact);
 
module.exports = router;
