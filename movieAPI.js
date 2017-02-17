const express = require('express')
const app = express()
// const routes = require('./routes')
const fetchExternalData = require('./fetch-external-data')
const databaseInterface = require('./databaseInterface')
app.use(express.static('public'))

app.movieURLs = [
  'https://movie-api-lyalzcwvbg.now.sh/paramount',
  'https://movie-api-lyalzcwvbg.now.sh/dreamworks'
]
app.actorURLs = ['https://movie-api-lyalzcwvbg.now.sh/actors']

app.get('/updateDatabase', function (request, response) {
  let movies = []
  let actors = []
  // tried to movie this mess to a different file but did not work out

  Promise.all([fetchExternalData.getMovies(app.movieURLs), fetchExternalData.getActors(app.actorURLs)])
    .then((response) => {
      movies = response[0]
      actors = response[1][0]
      const movieActors = sortMovieActors(actors)
      return Promise.all([databaseInterface.insertMovies(movies), databaseInterface.insertActors(actors), databaseInterface.insertMovieActors(movieActors)])
    })
    .then(() => {
      response.send('Succesfull')
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
})

app.get('/movie/:movieName', function (request, response) {
  const movieName = request.params.movieName
  if (typeof movieName !== 'string') {
    response.sendStatus(500)
    return
  }
  let responseObject = {}
  Promise.all([databaseInterface.readMovie(movieName), databaseInterface.readActorMovie(movieName)])
    .then((result) => {
      responseObject = result[0]
      const movieActors = result[1]
      responseObject.actors = []
      movieActors.forEach((movieactor) => {
        responseObject.actors.push(movieactor.actor)
      })
      response.send(responseObject)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
})

function sortMovieActors (actors) {
  const movieActors = []
  actors.forEach((actor) => {
    const movies = actor.movies
    movies.forEach((movie) => {
      movieActors.push({ actorName: actor.actorName, movieName: movie })
    })
  })
  return movieActors
}
app.listen(8080)
