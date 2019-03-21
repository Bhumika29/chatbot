const  HttpRequest=require('request');
var request = new HttpRequest();

request.open('GET', 'https://api.yomomma.info/', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    
      console.log(data);
  } else {
    console.log('error');
  }
}

request.send();