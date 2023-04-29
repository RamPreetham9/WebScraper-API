const axios = require('axios');
const cheerio = require('cheerio');
const https = require("https");


// const Tesseract=require("tesseract.js")

// const OCR = async (req,res) =>{
//     const { imageUrl } = req.body;
//     try {
//       const { data: { text } } = await Tesseract.recognize(imageUrl);
//       res.status(200).json({ text });
//       console.log(text);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// }

const ScrapeLink = async (req, res) => {
  const { myurl } = req.body;

  axios.get(myurl)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const links = $('a').map((i, link) => $(link).attr('href')).get();
      // console.log(links);
      const l = [];
      for (var i = 0; i < links.length; i++) {
        if (links[i].startsWith('http')) {
          l.push(links[i]);
        }
      }
      res.status(200).json({ 'data': l });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ 'error': error });
    });

}

const ScrapeImg = async (req, res) => {

  const { myurl } = req.body;

  https.get(myurl, (response) => {
    let body = '';

    response.on('data', (chunk) => {
      body += chunk;
    });

    response.on('end', () => {
      const $ = cheerio.load(body);

      const images = [];
      $('img').each((i, image) => {
        const src = $(image).attr('src');
        if (src) {
          images.push(src);
        }
      });

      // const l = [];
      // for (var i = 0; i < images.length; i++) {
      //   if (images[i].startsWith('http')) {
      //     l.push(images[i]);
      //   }
      // }
      res.status(200).json({ 'data': images });
    });
  }).on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred while scraping the web page');
  });
}

const ScrapeHead = async (req, res) => {

  const { myurl } = req.body;

  https.get(myurl, (response) => {
    let body = '';

    response.on('data', (chunk) => {
      body += chunk;
    });

    response.on('end', () => {
      const $ = cheerio.load(body);

      const headings = [];
      for (let i = 1; i <= 6; i++) {
        $(`h${i}`).each((j, heading) => {
          headings.push($(heading).text().trim());
        });
      }

      res.status(200).json({ 'data': headings });
    });
  }).on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred while scraping the web page');
  });
}

module.exports = { ScrapeImg, ScrapeHead, ScrapeLink };