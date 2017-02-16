const chai = require('chai')
const fetchExternalData = require('../fetch-external-data')
const expect = chai.expect
const movieURLs = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks']
const actorURLs = ['https://movie-api-lyalzcwvbg.now.sh/actors']
const movies = [
  {
    "movieName": "Movie 1",
    "releaseDate": "Oct-01-2015"
  },
  {
    "movieName": "Movie 2",
    "releaseDate": "Oct-01-2016"
  },
  {
    "movieName": "Movie 3",
    "releaseDate": "Nov-01-2016"
  },
  {
    "movieName": "Movie 4",
    "releaseDate": "Jan-01-2015"
  },
  {
    "movieName": "Movie 5",
    "releaseDate": "Feb-01-2016"
  },
  {
    "movieName": "Movie 6",
    "releaseDate": "March-01-2016"
  }
]

const actors = [
  {
    "actorName": "Actor 1",
    "movies": [
      "Movie 1",
      "Movie 2",
      "Movie 5"
    ]
  },
  {
    "actorName": "Actor 2",
    "movies": [
      "Movie 2",
      "Movie 3"
    ]
  },
  {
    "actorName": "Actor 3",
    "movies": [
      "Movie 1",
      "Movie 2",
      "Movie 3",
      "Movie 5",
      "Movie 6"
    ]
  }
]
describe('get Movie Data when given a valid input', function () {
  it('should return an array of json objects', function (done) {

    fetchExternalData.getMovies(movieURLs)
      .then(function (allData) {
        const movies = []
        allData.forEach((data) => {
          data = JSON.parse(data)
          data.forEach((movie) => {
            movies.push(movie)
          })
        })
        return Promise.resolve(movies)
      })

      .then((response) => {
        expect(response).to.be.eqls(movies)
        done()
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })
})

describe('get Movie Data when given a valid input', function () {
  it('should return an array of json objects', function (done) {

    fetchExternalData.getActors(actorURLs)
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
      .then((response) => {
        expect(response).to.be.eqls(actors)
        done()
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })
})