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
  return Promise.all(movieURLs.map(url => fetchExternalData.fetchData(url)))
    .then((allData) => {
      allData = [].concat.apply([], allData)
      return Promise.resolve(allData)
    })
}

fetchExternalData.getActors = function (actorURLs, callback) {
  // Put this whole code in a different module
  return Promise.all(actorURLs.map(url => {
    options.url = url
    return new Promise(function (resolve, reject) {
      request(options, function (err, res, body) {
        if (err) { return reject(err) }
        let responseData = JSON.parse(body)
        return resolve(responseData)
      })
    })
  }))
}

fetchExternalData.fetchData = function (url) {
  options.url = url
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      const responseData = JSON.parse(body)
      responseData.forEach(data => data.studio = url.split('/')[3])
      return resolve(responseData)
    })
  })
}

module.exports = fetchExternalData
