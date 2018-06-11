const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

const Stock = require('../models/stock');

// Add stock 
router.post('/add-stock', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let newStock = new Stock({
    stockName: req.body.stockName,
    stockDescription: req.body.stockDescription,
    stockHistorics: [{
      stockValue: req.body.stockValue
    }]
  });

  Stock.addStock(newStock, (err, stock) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register stock' })
    } else {
      res.json({ success: true, msg: 'Stock registered' })
    }
  });
});

// Update stock
router.put('/update-stock/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Stock.findByIdAndUpdate(req.params.id, {
    $push: {
      stockHistorics: {
        stockValue: req.body.stockValue
      }
    }
  }, {
      upsert: true
    },
    (err, updatedStock) => {
      if (err) {
        res.send('Error updating stock!');
      } else {
        return res.json({ success: true, message: 'A single stock was updated!' });
      }
    });
});

// Update stock
router.delete('/delete-stock/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Stock.findByIdAndRemove({ _id: req.params.id },
    (err, deleteStock) => {
      if (err) {
        res.send('Error deleting stock!');
      } else {
        return res.json({ success: true, message: 'A single stock was deleted!' });
      }
    });
});

// Get all stocks
router.get('/stocks', (req, res, next) => {
  Stock.find({},
    (err, allStocks) => {
      if (err) {
        res.send('Error finding stocks!');
      } else {
        return res.json(allStocks);
      }
    })
});

// Get single stock
router.get('/stocks/:id', (req, res, next) => {
  Stock.findById({ _id: req.params.id },
    (err, singleStock) => {
      if (err) {
        res.send('Error finding stocks!');
      } else {
        return res.json(singleStock);
      }
    })
});

router.clients = [];
router.addClient = function (client) {
  router.clients.push(client);
  router.notifyClients(client);
};
router.notifyClients = function (client) {
  Stock.find({}).exec(function (err, stocks) {
    if (err)
      return console.error(err);

    var toNotify = client ? new Array(client) : router.clients;
    toNotify.forEach(function (socket) {
      socket.emit('update', stocks);
    })
  });
}

module.exports = router;