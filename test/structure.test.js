/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const should = chai.should()

const winstonRed = require('./../index.js')

describe('Winston-Red', function () {
  it('should be an object', function () {
    winstonRed.should.be.an('object')
  })
  it('should expose a filters property', function () {
    winstonRed.should.have.property('filters')
    should.exist(winstonRed.filters)
  })
  it('should expose a rewrites property', function () {
    winstonRed.should.have.property('rewrites')
    should.exist(winstonRed.rewrites)
  })
})
