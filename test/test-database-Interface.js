const chai = require('chai')
const databaseOprations = require('../databaseInterface')
const expect = chai.expect

describe('insert movies when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovie('movie1', '01-01-1995')
    .then((result)=>{
      expect(result).to.be.eqls([])
      done()
    })
  })
})

describe('insert movies when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovie(1, [])
    .catch((result)=>{
      expect(result).to.be.eqls('Name is not valid')
      done()
    })
  })
})


describe('insert actors when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertActor('rahul')
    .then((result)=>{
      expect(result).to.be.eqls([])
      done()
    })
  })
})

describe('insert actors when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertActor(1)
    .catch((result)=>{
      expect(result).to.be.eqls('Name is not valid')
      done()
    })
  })
})

describe('insert actor movies when given valid data ', function () {
  it('should return rowcount of insertions', function (done) {
    databaseOprations.insertMovieActor('movie1', 'rahul')
    .then((result)=>{
      expect(result).to.be.eqls([])
      done()
    })
  })
})

describe('insert actor movies when given invalid data ', function () {
  it('should return error', function (done) {
    databaseOprations.insertMovieActor(1, 2)
    .catch((result)=>{
      expect(result).to.be.eqls('Movie is not valid')
      done()
    })
  })
})