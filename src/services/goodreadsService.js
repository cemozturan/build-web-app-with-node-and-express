var http = require('http');
var xml2js = require('xml2js'); // Goodreads API gives XML, we need to parse it into JSON
var parser = xml2js.Parser({explicitArray: false}); // The parser takes in a set of options, we pass in explicitArray equals false
var request = require('request');

var goodreadsService = function(){

  var getBookById = function(id, cb) {

    var options = {
      uri: 'https://www.goodreads.com/book/show/656?format=xml&key=c0pdOnztahV7kQZT4KicdQ',
      method: 'GET'
    };

    var callback = function (error, response, body) {
      if (!error && response.statusCode === 200) {
        parser.parseString(body, function (err, results) {
          cb(null, results.GoodreadsResponse.book);
        });
      } else {
        console.log(error);
        cb(error, null);
      }
    };

    request(options, callback);
  };

  return {
    getBookById: getBookById
  };
};

module.exports = goodreadsService;
