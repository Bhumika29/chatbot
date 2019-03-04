'use strict';
var dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const app = express();
const uuidv1 = require('uuid/v1');
var request=require('request');
var bodyParser=require('body-parser');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const AI_SESSION_ID = uuidv1();

const dialogflow = require('apiai');
const ai = dialogflow(ACCESS_TOKEN);
var Port=process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views')); // HTML Pages
app.use(express.static(__dirname + '/public')); // CSS, JS & Images
var path=require('path');
//var server=require('socket.io')(server);
const server = app.listen(Port, function(){
	console.log('listening on  port %d', server.address().port);
});

const socketio = require('socket.io')(server);
socketio.on('connection', function(socket){
  console.log('a user connected');
});

//Serve UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/app.html');
});
/*app.post('/webhook',(req,res) =>{
	console.log("received a post request");
	if(!req.body)
		return res.sendStatus(400);
	res.setHeader('Content-Type','application/json');
	console.log(req.body);
	console.log("Got parameters "+req.body.queryResult.parameters['geo-city']);
	var city=req.body.queryResult.parameters['geo-city'];
	var w=getWeather(city);
	let response=" ";
	let responseObj=
	{
		"fulfillmentText":response
		,"fulfillmentMessages":[{"text":{"text":[w]}}]
		,"source":""
	}
	console.log("Here is the response");
	console.log(responseObj);
	return res.json(responseObj);
});*/
/*var apiKey="34a9377e8da80bcf07ce23338784491c";
var result
function cb(err,response,body){
	if(err)
		console.log(error);
	var weather=JSON.parse(body);
	if(weather.message === 'city not found')
	{
			result="unable to get weather "+weather.message;
	}
	else
	{
		result="Right now its "+weather.main.temp+" degree with "+weather.weather[0].description;
	}
}
function getWeatherCity()
{
	result=undefined;
	var url="http://api.openweathermap.org/data/2.5/weather?q=$(city)&units=imperial&appid=$(apiKey)";
	console.log(url);
	var req=request(url,cb);
	while(result == undefined){
		require('deasync').runLoopOnce();
	}
		
	return result;
}*/
socketio.on('connection', function(socket) {
  socket.on('chat request', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let aiReq = ai.textRequest(text, {
      sessionId: AI_SESSION_ID
    });

    aiReq.on('response', (response) => {
      let aiResponse = response.result.fulfillment.speech;
      console.log('AI Response: ' + aiResponse);
      socket.emit('ai response', aiResponse);
    });

    aiReq.on('error', (error) => {
      console.log(error);
    });

    aiReq.end();

  });
});

