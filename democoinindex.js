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
    
  	var jokes=req.body.result.parameters.nearby;
  //	if(city == null)
  //		city="Delhi";
        var w=getJoke();
        return res.json({
          speech: w,
          displayText: w,
          source: "Places"
        }); 
  });

var result;
function getJoke()
{
  var resu;
	var coin=Math.floor(Math.random() * 2);
  if(coin==0)
  {
    resu='heads';
    console.log('heads');}
  else{
    resu='tails';
    console.log('tails');
  }
  result=resu;
	while(result == undefined){
		require('deasync').runLoopOnce();
	}
		
	return result;
}
  

app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});



