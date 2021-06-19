const axios = require('axios');
const movieKey = process.env.MOVIE_API_KEY

const Movie = require('../models/movie')

let getMovies = async (req, res) => {
  let movies = req.query.city;
  try{
    let localMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${movies}&page=1&include_adult=false`);
    let moviesOut = [];
    localMovies.data.results.forEach(i => {
      moviesOut.push(new Movie(i.title, i.overview, i.vote_average, i.vote_count, `https://image.tmdb.org/t/p/w500/${i.poster_path}`, i.popularity, i.release_date))
    })
    res.send(moviesOut)
    console.log(moviesOut);
  }
  catch(err) {
    console.error(err.message)
  }
};

module.exports = getMovies;