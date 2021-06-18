const axios = require('axios');
const weatherKey = process.env.WEATHER_API_KEY

let getWeather = async (req,res) => {
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
  }
  catch(err) {
    console.error(err.message)
  }
}

class Forecast {
  constructor(date, description) {
    this.date = date,
    this.description = description
  }
}

module.exports = getWeather;