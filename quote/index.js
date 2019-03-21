'use strict';
var dotenv = require('dotenv');
dotenv.load();
//var google = require('google');
const express = require("express");
const bodyParser = require("body-parser");
//const uuidv1 = require('uuid/v1');
const request=require("request");
var deasync = require('deasync');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const path=require("path");

  app.post('/webhook',(req,res) =>{
    //var city="delhi";
    
  	var jokes=req.body.result.parameters.quotes;
  //	if(city == null)
  //		city="Delhi";
        var w=getJoke();
        return res.json({
          speech: w,
          displayText: w,
          source: "quotee"
        }); 
  });

var result;
function getJoke()
{
	result=undefined;
	const request = require('request');

//let apiKey = '392e5b9bd00f4c5c35a0533f7abbac5d';
//let city = 'portland';
let url = `https://random-math-quote-api.herokuapp.com/`
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let q = JSON.parse(body);
    let message = `It's ${q.quote}!`;
    console.log(message);
    result=message;
  }

});
	while(result == undefined){
		require('deasync').runLoopOnce();
	}
		
	return result;
}
  

app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});