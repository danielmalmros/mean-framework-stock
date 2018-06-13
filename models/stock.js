const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Stock schema
const StockSchema = mongoose.Schema({
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

const Stock = module.exports = mongoose.model('Stock', StockSchema);

module.exports.addStock = (newStock, callback) => {
    newStock.save(callback)
}