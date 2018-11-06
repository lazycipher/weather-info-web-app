const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "f522ecab54f8aca7156b4612359d8fa4";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! and Humidity is ${weather.main.humidity}`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })  
app.listen(0, function () {
  console.log('Weather app listening on ' + app.address().port );
})

