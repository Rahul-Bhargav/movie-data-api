var request = require('request')
const chai = require('chai')
const expect = chai.expect

var options = {
  method: 'GET',
  url: 'http://localhost:8080/updatedatabase',
  headers:
  {
    'postman-token': 'b7a76d52-2dd8-42a6-1ebd-490fc7107c34',
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  form: { task: 'hhel', status: 'false' }
}

describe(('Update database when called '), function () {
  it('Should return success if updated', function (done) {
    request(options, function (error, response, body) {
      console.log('here')
      if (error) throw new Error(error)
      console.log(response)
      expect(body).to.be.eqls('Succesfull')
      done()
    })
  })
})
