const axios = require('axios');
const cheerio = require('cheerio');

const Scrape = async (req, res) => {
    const {myurl} = req.body;
    axios.get(myurl)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const links = $('a').map((i, link) => $(link).attr('href')).get();
            // console.log(links);
            res.status(200).json({'links':links});
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({'error': error});
        });
}

module.exports = {Scrape};