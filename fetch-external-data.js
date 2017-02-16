const request = require("request")

const options = {
  method: 'GET',
  url: '',
  headers:
  {
    'postman-token': 'c754d52e-1eaa-48fd-b38c-02e2145a9231',
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  form: { task: 'hhel', status: 'false' }
}


const fetchExternalData = {}

fetchExternalData.getMovies = function (movieURLs) {
  let movies = []
  // Put this whole code in a different module
  return Promise.all(movieURLs.map(url => {
    options.url = url
    return new Promise(function (resolve, reject) {
      request(options, function (err, res, body) {
        if (err) { return reject(err) }
        return resolve(body)
      })
    })
  }))

}

fetchExternalData.getActors = function (actorURLs, callback) {
  let actors = []
  // Put this whole code in a different module
  return Promise.all(actorURLs.map(url => {
    options.url = url
    return new Promise(function (resolve, reject) {
      request(options, function (err, res, body) {
        if (err) { return reject(err) }
        return resolve(body)
      })
    })
  }))
}

fetchExternalData.fetchData = function (options, callback) {
  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    const responseMovies = JSON.parse(body)
    responseMovies.forEach(movie => movies.push(movie))
  })
}

module.exports = fetchExternalData