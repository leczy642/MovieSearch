//Movie Search Engine
var express = require('express');
var app = express();

app.set("view engine", "ejs")
var request = require('request');

app.get('/', function(req, res) {
    res.render('searchpage');
});

app.get('/results', function(req, res) {
    //use req.query to get data from query string
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
    request(url, function(error, response, body) {
        //our callback function takes 3 paramters: error -> which returns an error, response->which contains the statuscode
        //and the body-> which is the data returned and is usually a string and not a JavaScript Object    
        if (!error && response.statusCode == 200) {
            //to convert it from a string to JSON we will use the 
            //JSON.parse() method
            var parsedData = JSON.parse(body)
                //this returns the ttile of the first movie element
                //res.send(parsedData.Search[0]);
                //or parsedData.Search[0]['Title'] or parsedData.Search[0].Title returns the title of the first element
            res.render('resultspage', { data: parsedData });
            console.log("App started");
        }
    });
});
app.listen(4000)