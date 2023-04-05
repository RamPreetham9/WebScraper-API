const express = require('express');
const { Scrape } = require('../controllers/controller.js');

const router = express.Router();

router.post("/",Scrape);

// router.post("/ocr",OCR);

module.exports = router;