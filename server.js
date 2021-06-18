console.log('node says hey')

const express = require('express');
const app = express()
require('dotenv').config();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT;

// ------------------------------------------------------

const weatherKey = process.env.WEATHER_API_KEY
const { response } = require('express');
const { default: axios } = require('axios');


app.get('/', (req, res) => {
  res.send('Server says haaaaayyyyy');
});

app.get('/weather', async (req,res) => {
  let lat = req.query.lat
  let lon = req.query.lon
  try{
    let LocalForecast = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&units=I&lat=${lat}&lon=${lon}`)
    let forecastOut = [] 
    LocalForecast.data.data.forEach(i => {
      forecastOut.push(
        new Forecast(i.datetime, `Low of ${i.low_temp}, high of ${i.high_temp}, with ${i.weather.description}`)
        )
    })
    res.send(forecastOut)
  console.log(forecastOut);
  }
  catch(err) {
    console.error(err.message)
  }
})

app.get('/*', (req,res) => {
  response.status(404).send('Sorry, route not found');
  response.status(500).send('Something went wrong.');
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});

class Forecast {
  constructor(date, description) {
    this.date = date,
    this.description = description
  }
}

// weatherData.forEach