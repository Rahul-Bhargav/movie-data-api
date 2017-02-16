const express = require('express')
const app = express()
// const routes = require('./routes')
const fetchExternalData = require('./fetch-external-data')
const databaseInterface = require('./databaseInterface')
app.use(express.static('public'))

app.movieURLs = [
  'https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks'
]
app.actorURLs = ['https://movie-api-lyalzcwvbg.now.sh/actors']

app.get('/updateDatabase', function (request, response) {
  let movies = []
  let actors = []
  //tried to movie this mess to a different file but did not work out
  fetchExternalData.getMovies(app.movieURLs)
    .then(function (allData) {
      const movies = []
      allData.forEach((data) => {
        data.forEach((movie) => {
          movies.push(movie)
        })
      })
      return Promise.resolve(movies)
    })
    .then((resolve) => {
      movies = resolve
      return databaseInterface.insertMovies(movies)
    })
    .then(() => {
      return fetchExternalData.getActors(app.actorURLs)
    })
    .then(function (allData) {
      const actors = []
      allData.forEach((data) => {
        data = JSON.parse(data)
        data.forEach((actor) => {
          actors.push(actor)
        })
      })
      return Promise.resolve(actors)
    })
    .then((result) => {
      actors = result
      console.log(actors)
      return databaseInterface.insertActors(actors)
    })
    .then(() => {
      return sortMovieActors(actors)
    })
    .then((result) => {
      movieActors = result
      return databaseInterface.insertMovieActors(movieActors)
    })
    .then(() => {
      response.send('Succesfull')
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(500);
    })
})

app.get('/movie/:movieName', function (request, response) {
  const movieName = request.params.movieName
  if (typeof movieName !== 'string') {
    response.sendStatus(500)
    return
  }
  const responseObject = {}
  databaseInterface.readMovie(movieName)
    .then((result) => {
      const movie = result[0]
      responseObject.movieName = movie.name
      responseObject.releaseDate = movie.releasedate
      responseObject.studio = movie.studio
      console.log(responseObject)
      return databaseInterface.readActorMovie(responseObject.movieName)
    })
    .then((result) => {
      movieActors = result
      responseObject.actors = []
      movieActors.forEach((movieactor) => {
        responseObject.actors.push(movieactor.actor)
      })
      response.send(responseObject)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(500);
    })
})

function sortMovieActors(actors) {
  const movieActors = []
  actors.forEach((actor) => {
    const movies = actor.movies;
    movies.forEach((movie) => {
      movieActors.push({ actorName: actor.actorName, movieName: movie })
    })
  })
  return movieActors
}

app.listen(8080)