var request = require('request');
var cheerio = require('cheerio');
var searchTerm = 'computers';
var url = 'http://www.google.com/search?q=' + searchTerm;
request(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('a'); //jquery get all hyperlinks
  $(links).each(function(i, link){
    console.log('new Link');
    console.log($(link).text() + ':\n  ' + $(link).attr('href'));
  });
});