const axios = require('axios');
const cheerio = require('cheerio');
const https=require("https");

const Scrape = async (req, res) => {
    const {myurl,tag} = req.body;
    if(tag==='a') {
        axios.get(myurl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const links = $('a').map((i, link) => $(link).attr('href')).get();
                // console.log(links);
                res.status(200).json({'data':links});
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({'error': error});
            });

    } else if(tag==='img') {

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
        
              res.status(200).json({'data':images});
            });
          }).on('error', (err) => {
            console.error(err);
            res.status(500).send('An error occurred while scraping the web page');
          });

    } else if(tag==='h') {

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
        
              res.status(200).json({'data' :headings});
            });
          }).on('error', (err) => {
            console.error(err);
            res.status(500).send('An error occurred while scraping the web page');
          });

    }
             
}

module.exports = {Scrape};