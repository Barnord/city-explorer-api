console.log('node says hey')

const express = require('express');
const app = express()
require('dotenv').config();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT;

// ------------------------------------------------------

const weatherData = require('./data/weather.json');
const { response } = require('express');

app.get('/', (req, res) => {
  res.send('Server says haaaaayyyyy');
});

app.get('/weather', (req, res) => {
  let q = req.query.q;
  let lat = req.query.lat;
  let lon = req.query.lon;
  let location = weatherData.find(location => location.city_name==q);
  let weather = [];
  location.data.forEach(i => {
    weather.push(
      new Forecast(i.datetime, `Low of ${i.low_temp}, high of ${i.max_temp}, with ${i.weather.description}`)
    )
  })
  // res.send(weatherData.find(city => city.city_name.toLowerCase().includes(q.toLowerCase())));
  res.send(weather)
});

app.get('/*', (req,res) => {
  response.status(404).send('Sorry, route not found');
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});

class Forecast {
  constructor(date, description) {
    this.date = date,
    this.description = description
  }
}

weatherData.forEach