const Sequelize = require('Sequelize')

const dbName = process.env.DEV_MODE === 'test' ? 'testdb' : 'moviedb'

const sequelize = new Sequelize('postgres://rahulsurabhi:rah1161!@localhost:5432/' + dbName)

const databaseOprations = {
  readMovie: function (movie) {
    return sequelize.query(`SELECT NAME,RELEASEDATE,STUDIO FROM MOVIE WHERE NAME=:movie`, { replacements: { movie: movie }, type: sequelize.QueryTypes.SELECT })
  },
  readActor: function (actor) {
    return sequelize.query(`SELECT NAME FROM ACTORS WHERE NAME=:actor`, { replacements: { actor: actor }, type: sequelize.QueryTypes.SELECT })
  },
  readActorMovie: function (movie) {
    return sequelize.query(`SELECT MOVIE,ACTOR FROM ACTORMOVIE WHERE MOVIE=:movie`, { replacements: { movie: movie }, type: sequelize.QueryTypes.SELECT })
  },
  insertMovie: function (name, releaseDate, studio) {
    if (typeof name !== 'string') return Promise.reject('Name is not valid')
    if (typeof releaseDate !== 'string') return Promise.reject('Release Date is not valid')
    return sequelize.query(`INSERT INTO MOVIE (NAME, RELEASEDATE, STUDIO) VALUES (:name,:releaseDate, :studio)`, { replacements: { name: name, releaseDate: releaseDate, studio: studio }, type: sequelize.QueryTypes.INSERT })
  },
  insertMovies: function (movies) {
    let values = ''
    let isValid = true
    const errorValues = []
    // add functionality to check for all errors at once
    movies.forEach((movie, index) => {
      if (typeof movie.movieName !== 'string') {
        isValid = false
        errorValues.push(index)
      } else if (typeof movie.releaseDate !== 'string') {
        isValid = false
        errorValues.push(index)
      } else if (typeof movie.studio !== 'string') {
        isValid = false
        errorValues.push(index)
      }
      values += `('${movie.movieName}', '${movie.releaseDate}', '${movie.studio}'), `
    })
    if (!isValid) {
      return Promise.reject(`Entries are not valid at indices :${errorValues}`)
    }
    values = values.slice(0, -2)
    // add functionality to have replacements
    return sequelize.query(`INSERT INTO MOVIE (NAME, RELEASEDATE, STUDIO) VALUES ${values}`, { type: sequelize.QueryTypes.INSERT })
  },
  insertActors: function (actors) {
    let values = ''
    let isValid = true
    const errorValues = []
    // add functionality to check for all errors at once
    actors.forEach((actor, index) => {
      if (typeof actor.actorName !== 'string') {
        isValid = false
        errorValues.push(index)
      }
      values += `('${actor.actorName}'), `
    })
    if (!isValid) {
      return Promise.reject(`Entries are not valid at indices :${errorValues}`)
    }
    values = values.slice(0, -2)
    // add functionality to have replacements
    return sequelize.query(`INSERT INTO ACTORS (NAME) VALUES ${values}`, { type: sequelize.QueryTypes.INSERT })
  },
  insertActor: function (name) {
    if (typeof name !== 'string') return Promise.reject('Name is not valid')
    return sequelize.query(`INSERT INTO ACTORS (NAME) VALUES (:name)`, { replacements: { name: name }, type: sequelize.QueryTypes.INSERT })
  },
  insertMovieActor: function (movieName, actor) {
    if (typeof movieName !== 'string') return Promise.reject('Movie is not valid')
    if (typeof actor !== 'string') return Promise.reject('Actor Name is not valid')
    return sequelize.query(`INSERT INTO ACTORMOVIE (MOVIE, ACTOR) VALUES (:movieName,:actor)`, { replacements: { movieName: movieName, actor: actor }, type: sequelize.QueryTypes.INSERT })
  },
  insertMovieActors: function (movieActors) {
    let values = ''
    let isValid = true
    const errorValues = []
    // add functionality to check for all errors at once
    movieActors.forEach((movieActor, index) => {
      if (typeof movieActor.actorName !== 'string') {
        isValid = false
        errorValues.push(index)
      }
      if (typeof movieActor.movieName !== 'string') {
        isValid = false
        errorValues.push(index)
      }
      values += `('${movieActor.movieName}','${movieActor.actorName}'), `
    })
    if (!isValid) {
      return Promise.reject(`Entries are not valid at indices :${errorValues}`)
    }
    values = values.slice(0, -2)
    // add functionality to have replacements
    return sequelize.query(`INSERT INTO ACTORMOVIE (MOVIE, ACTOR) VALUES ${values}`, { type: sequelize.QueryTypes.INSERT })
  }
}

module.exports = databaseOprations
