const axios = require("axios");
const cheerio = require("cheerio");

const url = "http://animeflix.io/movies";

axios(url)
  .then(response => {
    const html = response.data;
    console.log(html);
    const $ = cheerio.load(html);
    const statsTable = $(" div .grouped > div");
    console.log(Object.entries(statsTable));
  })
  .catch(console.error);
