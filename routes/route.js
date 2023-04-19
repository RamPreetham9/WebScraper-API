const express = require('express');
const { ScrapeImg, ScrapeHead, ScrapeLink } = require('../controllers/controller.js');

const router = express.Router();

router.post("/img", ScrapeImg);

router.post("/head", ScrapeHead);

router.post("/links", ScrapeLink);

// router.post("/ocr",OCR);

module.exports = router;