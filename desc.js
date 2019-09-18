const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');


let movies = [];

fs.readFile('movies.json', 'utf8', function (err, contents) {
  movies = contents;
});




const url = "http://animeflix.io/api/anime/detail?slug=";


setTimeout(() => {
  console.log('Checking props...')

  for (let prop in movies) {
    console.log(prop);
    axios(url.concat(`${prop}&load=genres`))
      .then(response => {
        const html = response.data;

        html.data.forEach(prop => {
          arr.push(prop);
        })

        if (arr.length == 1) {
          console.log(arr)
        }
      })
      .catch(console.error);

    setTimeout(() => {
      console.log('Writing desc...')
      // console.log(arr.length)

      var file = fs.createWriteStream('desc.json');
      file.on('error', function (err) { /* error handling */ });
      arr.forEach(obj => {
        console.log(obj);
        fs.appendFileSync('./desc.json', JSON.stringify(obj) + ',');
      })
      file.end();
    }, 10000)

  }




}, 2000)

