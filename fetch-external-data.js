const request = require('request')

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

// check for valididty of URL

fetchExternalData.getMovies = function (movieURLs) {
  // Put this whole code in a different module
  return Promise.all(movieURLs.map(url => {
    options.url = url
    return new Promise(function (resolve, reject) {
      request(options, function (err, res, body) {
        if (err) { return reject(err) }
        const data = JSON.parse(body)
        const studio = options.url.split('/')[3]
        data.forEach((movie) => movie.studio = studio)
        return resolve(data)
      })
    })
  }))
}

fetchExternalData.getActors = function (actorURLs, callback) {
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

// use this module in the above scenarios
fetchExternalData.fetchData = function (options, callback) {
  const movies = []
  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    const responseMovies = JSON.parse(body)
    responseMovies.forEach(movie => movies.push(movie))
  })
}

module.exports = fetchExternalData
