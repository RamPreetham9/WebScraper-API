const express = require('express');
const { Scrape } = require('../controllers/controller.js');

const router = express.Router();

router.post("/",Scrape);

module.exports = router;