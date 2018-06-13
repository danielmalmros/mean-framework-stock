"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

// Create a new schema that accepts a stock object.
const testSchema = new Schema({
  stockName: String,
  stockDescription: String,
  stockHistorics: [{
    stockValue: Number,
    stockTimeStamp: {
      type: Date,
      default: Date.now
    }
  }]
});

// Create a new collection called teststocks.
const testStocks = mongoose.model('teststocks', testSchema);

describe('Database Tests', function () {

  // Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/meanauth');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test database creating new stock collection', function () {

    // Save object with data.
    it('New test stock saved to test collection', function (done) {
      var testName = testStocks({
        stockName: 'Test name',
        stockDescription: 'Test description',
        stockHistorics: [{
          stockValue: 800000
        }]
      });

      testName.save(done);
    });
    it('Dont save incorrect format to database stock collection', function (done) {

      // Attempt to save with wrong information to teststock collection.
      var wrongSave = testStocks({
        stockName: 'Test name',
        stockDescription: 'Test description',
        stockHistorics: [{
          stockValue: 'not a number' // Testing that this is NOT a int
        }]
      });
      
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', function (done) {

      // Look up the 'stockName' object previously saved.
      testStocks.find({ stockName: 'Test name' }, (err, testName) => {
        if (err) { throw err; }
        if (testName.length === 0) { throw new Error('No data!'); }
        done();
      });
    });
  });

  // After all tests are finished drop the test collection and close connection
  after(function (done) {
    mongoose.connection.db.dropCollection('testStocks', function () {
      mongoose.connection.close(done);
    });
  });
});