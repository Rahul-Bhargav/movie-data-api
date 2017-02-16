const Sequelize = require('Sequelize')

const dbName = process.env.DEV_MODE === 'test' ? 'testdb' : 'Excercise'

const sequelize = new Sequelize('postgres://rahulsurabhi:rah1161!@localhost:5432/' + dbName)

const databaseOprations = {
  insertMovie: function (name, releaseDate) {
    if (typeof name !== 'string') return Promise.reject('Name is not valid')
    if (typeof releaseDate !== 'string') return Promise.reject('Release Date is not valid')
    return sequelize.query(`INSERT INTO MOVIE (NAME, RELEASEDATE) VALUES (:name,:releaseDate)`, { replacements: { name: name, releaseDate: releaseDate }, type: sequelize.QueryTypes.INSERT })
  },
  insertActor: function (name) {
    if (typeof name !== 'string') return Promise.reject('Name is not valid')
    return sequelize.query(`INSERT INTO ACTORS (NAME) VALUES (:name)`, { replacements: { name: name }, type: sequelize.QueryTypes.INSERT })
  },
  insertMovieActor: function (movieName, actor) {
    if (typeof movieName !== 'string') return Promise.reject('Movie is not valid')
    if (typeof actor !== 'string') return Promise.reject('Actor Name is not valid')
    return sequelize.query(`INSERT INTO ACTORMOVIE (MOVIE, ACTOR) VALUES (:movieName,:actor)`, { replacements: { movieName: movieName, actor: actor }, type: sequelize.QueryTypes.INSERT })
  }
}

const checkValidity = function (id, description, status) {
    if (isFloat(id)) return `id-${id} is not a valid number`
    if (isNaN(parseInt(id))) return `id-${id} is not a valid number`

    if (typeof description !== 'string') return `description-${description} is not a string`

    if (typeof status !== 'boolean') return `status given is not a boolean`

    return true
  }

module.exports = databaseOprations