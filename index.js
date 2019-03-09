'use strict';
var dotenv = require('dotenv');
dotenv.load();
var google = require('google');
const express = require("express");
const bodyParser = require("body-parser");
const uuidv1 = require('uuid/v1');
const request=require("request");
var deasync = require('deasync');
const app = express();
google.resultsPerPage = 1;
var nextCounter = 0;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const path=require("path");
//const server=require("http").createServer(app);
//const io=require("socket.io")(server);
app.post('/webhook',(req,res) =>{
	//var city="delhi";
	
//	var city=req.body.result.parameters.geoCity;
//	if(city == null)
//		city="Delhi";
	var city =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.geoCity
      ? req.body.result.parameters.geoCity
      : loc();
	 
	var w=getWeatherCity(city);
	if(w==null)
	{
		var query=req.body.result;
		w=search(querystring);
	}
	return res.json({
    speech: w,
    displayText: w,
    source: "webhook-echo-sample"
  });
  
	
	
})
//console.log(w);
var rlt;
function loc()
{
	rlt=undefined;
	var req=request("http://ipinfo.io", function(err,response,body) {
	var loc=JSON.parse(body);
	console.log(loc);
	console.log(loc.city);
    rlt=loc.city;
});
while(rlt == undefined){
		require('deasync').runLoopOnce();
	}
		
	return rlt;

}
var result;
function getWeatherCity(city)
{
	result=undefined;
	var apiKey="392e5b9bd00f4c5c35a0533f7abbac5d";
	var url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;
	console.log(url);
	var req=request(url,function (err,response,body){
	if(err)
		console.log(err);
	var weather=JSON.parse(body);
	console.log(weather);
	if(weather.message === 'city not found')
	{
			result="unable to get weather "+weather.message;
	}
	else
	{
		result="Right now its "+weather.main.temp+" degree with "+weather.weather[0].description;
	}
});
	while(result == undefined){
		require('deasync').runLoopOnce();
	}
		
	return result;
}
function search(querystring)
{
	google(querystring, function (err, res){
		if (err) console.error(err)
	
		for (var i = 0; i < res.links.length; ++i) {
			var link = res.links[i];
			console.log(link.title)  
			console.log(link.href)
			//console.log(link.description + "\n")
		}
	
		if (nextCounter < 4) {
			nextCounter += 1
			if (res.next) res.next()
		}
	});
};
  

app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
