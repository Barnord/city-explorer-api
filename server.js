console.log('node says hey')

const express = require('express');
const app = express()
require('dotenv').config();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT;

// ------------------------------------------------------

const { response } = require('express');
const { default: axios } = require('axios');

const routeHandlers = require('./routeHandlers');

app.get('/weather', routeHandlers.getWeather)

app.get('/movies', routeHandlers.getMovies)

app.get('/*', (req,res) => {
  response.status(404).send('Sorry, route not found');
  response.status(500).send('Something went wrong.');
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});
