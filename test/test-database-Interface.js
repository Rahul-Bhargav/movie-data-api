const chai = require('chai')
const databaseOprations = require('../databaseInterface')
const expect = chai.expect

const movies = [
  {
    movieName: 'Movie 1',
    releaseDate: 'Oct-01-2015',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 2',
    releaseDate: 'Oct-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 3',
    releaseDate: 'Nov-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 4',
    releaseDate: 'Jan-01-2015',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 5',
    releaseDate: 'Feb-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 6',
    releaseDate: 'March-01-2016',
    studio: 'dreamworks'
  }
]

const invalidMovies = [
  {
    movieName: 'Movie 1',
    releaseDate: 'Oct-01-2015',
    studio: 'dreamworks'
  },
  {
    movieName: 1,
    releaseDate: 'Oct-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 2,
    releaseDate: 'Nov-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 4',
    releaseDate: 'Jan-01-2015',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 5',
    releaseDate: 'Feb-01-2016',
    studio: 'dreamworks'
  },
  {
    movieName: 'Movie 6',
    releaseDate: 'March-01-2016',
    studio: 'dreamworks'
  }
]

const actors = [
  {
    'actorName': 'Actor 1',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 5'
    ]
  },
  {
    'actorName': 'Actor 2',
    'movies': [
      'Movie 2',
      'Movie 3'
    ]
  },
  {
    'actorName': 'Actor 3',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 3',
      'Movie 5',
      'Movie 6'
    ]
  }
]

const invalidactors = [
  {
    'actorName': 'Actor 1',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 5'
    ]
  },
  {
    'actorName': 1,
    'movies': [
      'Movie 2',
      'Movie 3'
    ]
  },
  {
    'actorName': 'Actor 3',
    'movies': [
      'Movie 1',
      'Movie 2',
      'Movie 3',
      'Movie 5',
      'Movie 6'
    ]
  }
]

const movieActors = [
  {
    'actorName': 'Actor 1',
    'movieName': 'movie 1'
  },
  {
    'actorName': 'Actor 2',
    'movieName': 'movie 1'
  }
]

const invalidmovieActors = [
  {
    'actorName': 'Actor 1',
    'movieName': 'movie 1'
  },
  {
    'actorName': 1,
    'movieName': 'movie 1'
  }
]

describe('insert movie when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovie('movie1', '01-01-1995', 'paramount')
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert movie when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovie(1, [])
      .catch((result) => {
        expect(result).to.be.eqls('Name is not valid')
        done()
      })
  })
})

describe('insert movies when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovies(movies)
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert movies when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovies(invalidMovies)
      .catch((result) => {
        expect(result).to.be.eqls('Entries are not valid at indices :1,2')
        done()
      })
  })
})

describe('insert actors when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertActors(actors)
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert actors when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertActors(invalidactors)
      .catch((result) => {
        expect(result).to.be.eqls('Entries are not valid at indices :1')
        done()
      })
  })
})

describe('insert actor when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertActor('rahul')
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert actor when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertActor(1)
      .catch((result) => {
        expect(result).to.be.eqls('Name is not valid')
        done()
      })
  })
})

describe('insert actor movie when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovieActor('movie1', 'rahul')
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert actor movie when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovieActor(1, 2)
      .catch((result) => {
        expect(result).to.be.eqls('Movie is not valid')
        done()
      })
  })
})

describe('insert actor movies when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovieActors(movieActors)
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('insert actor movies when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovieActors(invalidmovieActors)
      .catch((result) => {
        expect(result).to.be.eqls('Entries are not valid at indices :1')
        done()
      })
  })
})

describe('read movies when given valid movie name ', function () {
  it('should return movie object', function (done) {
    databaseOprations.readMovie('Movie 1')
      .then((result) => {
        expect(result).to.be.eqls([{
          name: 'Movie 1',
          releasedate: 'Oct-01-2015',
          studio: 'dreamworks'
        }])
        done()
      })
  })
})

describe('read actors when given valid actor name ', function () {
  it('should return movie object', function (done) {
    databaseOprations.readActor('Actor 1')
      .then((result) => {
        expect(result).to.be.eqls([{
          name: 'Actor 1'
        }])
        done()
      })
  })
})

describe('read movieActors when given valid movie name ', function () {
  it('should return movieactor object', function (done) {
    databaseOprations.readActorMovie('movie 1')
      .then((result) => {
        expect(result).to.be.eqls([{
          actor: 'Actor 1',
          movie: 'movie 1'
        }, {
          actor: 'Actor 2',
          movie: 'movie 1'
        }])
        done()
      })
  })
})
