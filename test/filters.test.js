/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const should = chai.should()

const winstonRed = require('./../index.js')
const filters = winstonRed.filters

describe('Filters', function () {
  it('should be an object', function () {
    should.not.be.empty(filters)
    filters.should.be.an('object')
  })

  describe('IR SSN (irSSN)', function () {
    const irSSN = filters.irSSN

    it('shoule be a function', function () {
      irSSN.should.be.a('function')
    })

    it('should return a string', function () {
      let result = irSSN('error', 'Hello World!')
      result.should.be.a('string')
    })

    it('should not care about the logging level', function () {
      let validSSN = '1111111111'

      let errorResponse = irSSN('error', validSSN)
      let warningResponse = irSSN('warn', validSSN)
      let infoResponse = irSSN('info', validSSN)
      let verboseResponse = irSSN('verbose', validSSN)
      let debugResponse = irSSN('debug', validSSN)
      let sillyResponse = irSSN('silly', validSSN)

      warningResponse.should.equal(errorResponse)
      infoResponse.should.equal(errorResponse)
      verboseResponse.should.equal(errorResponse)
      debugResponse.should.equal(errorResponse)
      sillyResponse.should.equal(errorResponse)
    })

    it('should not care about the metadata')

    it('should not change the message if it does not contain a valid ssn', function () {
      let ssnFreeString = 'The quick brown fox jumps over the lazy dog'
      let response = irSSN('error', ssnFreeString)
      response.should.equal(ssnFreeString)
    })

    it('should alter the message if it contains a valid ssn', function () {
      let sensitiveLog = 'The quick brown fox with ssn 1111111111 jumps over the lazy dog with ssn 4990135849'
      let response = irSSN('error', sensitiveLog)
      response.should.not.equal(sensitiveLog)
    })

    it('should replace middle digits of the ssn with stars. pattern: 000***0000', function () {
      let sensitiveLog = 'Hello World! My SSN is 4990135849'
      let response = irSSN('error', sensitiveLog)
      response.should.equal('Hello World! My SSN is 499***5849')
    })

    it('should not leave ssns in the result', function () {
      let sensitiveLog = 'Hello World! My SSN is 4990135849'
      let response = irSSN('error', sensitiveLog)
      response.should.not.include('4990135849')
    })

    it('should apply the filter for all occurrences of ssns', function () {
      let sensitiveLog = 'The quick brown fox with ssn 1111111111 jumps over the lazy dog with ssn 4990135849'
      let response = irSSN('error', sensitiveLog)
      response.should.not.include('1111111111')
      response.should.not.include('4990135849')
      response.should.include('111***1111')
      response.should.include('499***5849')
    })
  })

  describe('IR Credit Card (irCreditCard)', function () {
    const irCreditCard = filters.irCreditCard

    it('shoule be a function', function () {
      irCreditCard.should.be.a('function')
    })

    it('should return a string', function () {
      let result = irCreditCard('error', 'Hello World!')
      result.should.be.a('string')
    })

    it('should not care about the logging level', function () {
      let validCreditCard = '6037991165316294'

      let errorResponse = irCreditCard('error', validCreditCard)
      let warningResponse = irCreditCard('warn', validCreditCard)
      let infoResponse = irCreditCard('info', validCreditCard)
      let verboseResponse = irCreditCard('verbose', validCreditCard)
      let debugResponse = irCreditCard('debug', validCreditCard)
      let sillyResponse = irCreditCard('silly', validCreditCard)

      warningResponse.should.equal(errorResponse)
      infoResponse.should.equal(errorResponse)
      verboseResponse.should.equal(errorResponse)
      debugResponse.should.equal(errorResponse)
      sillyResponse.should.equal(errorResponse)
    })

    it('should not care about the metadata')

    it('should not change the message if it does not contain a valid credit card number', function () {
      let ccFreeString = 'The quick brown fox jumps over the lazy dog'
      let response = irCreditCard('error', ccFreeString)
      response.should.equal(ccFreeString)
    })

    it('should alter the message if it contains a valid credit card number', function () {
      let sensitiveLog = 'The quick brown fox with credit card number 6037991165316294 jumps over the lazy dog'
      let response = irCreditCard('error', sensitiveLog)
      response.should.not.equal(sensitiveLog)
    })

    it('should replace the 2 middle sections of the credit card number with stars. pattern: 0000********0000', function () {
      let sensitiveLog = 'Hello World! My Credit Card Number is 6037991165316294'
      let response = irCreditCard('error', sensitiveLog)
      response.should.equal('Hello World! My Credit Card Number is 6037********6294')
    })

    it('should not leave credit card numbers in the result', function () {
      let sensitiveLog = 'Hello World! My credit card number is 6037991165316294'
      let response = irCreditCard('error', sensitiveLog)
      response.should.not.include('6037991165316294')
    })

    it('should apply the filter for all occurrences of credit card numbers', function () {
      let sensitiveLog = 'The quick brown fox with credit card number 6037991165316294 jumps over the lazy dog with credit card number 5892101157435518'
      let response = irCreditCard('error', sensitiveLog)
      response.should.not.include('6037991165316294')
      response.should.not.include('5892101157435518')
      response.should.include('6037********6294')
      response.should.include('5892********5518')
    })
  })
})
