const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');


const url = "http://animeflix.io/api/anime/popular?limit=12&type=Movie";

const ref = 'http://animeflix.io/api/anime/popular?limit=12&type=Movie&page=20'


let arr = [];


let wait = 0;

for (let i = 0; i < 20; i++) {
  wait++;

  if (i < 2) {
    axios(url)
      .then(response => {
        const html = response.data;
        html.data.forEach(obj => {
          arr.push(obj.data);
        })
      })
      .catch(console.error);

  } else {
    axios(url.concat(`&page=${i}`))
      .then(response => {
        const html = response.data;

        html.data.forEach(obj => {
          arr.push(obj);
        })

        if (arr.length == 1) {
          console.log(arr)
        }
      })
      .catch(console.error);

  }

}



setTimeout(() => {
  console.log(arr.length)

  var file = fs.createWriteStream('data.json');
  file.on('error', function (err) { /* error handling */ });
  arr.forEach(obj => {
    console.log(obj);
    fs.appendFileSync('./data.json', JSON.stringify(obj) + ',');
  })
  file.end();
}, 10000)
