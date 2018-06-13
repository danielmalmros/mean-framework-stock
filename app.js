const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const socketio = require('socket.io');
const http = require('http');

const Stock = require('./models/stock');
const testData = require('./test-data');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);

    // Create test data when opening the applications for the first time.
    // Will not run this if stock collections already been made.
    // Test data can be found in test-data.js in root.
    let stockExist = false;

    // Looking for exisiting collections
    mongoose.connection.db.listCollections().toArray((error, collections) => {

        // Trying to find collection 'stocks'
        collections.forEach((collection) => {
            if (collection.name === 'stocks') {
                stockExist = true
            }
        })

        // Add test data if collection 'stocks' is not created.
        if (!stockExist) {
            console.log('First time used - adding test data!');
            testData.forEach((stock) => {
                var addStocks = Stock(stock);
                mongoose.connection.db.collection("stocks").insertOne(addStocks, function (err, res) {
                    if (err) throw err;
                    console.log("document inserted");
                });
            })
        }
    })
})

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
})

const app = express();

// Routes
const users = require('./routes/users');
const stocks = require('./routes/stocks');

// Port number
const port = 3000;

// CORS Middelware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middelware
app.use(bodyParser.json());

// Passport middelware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)
app.use('/stocks', stocks)

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid endport');
});

app.get('*', () => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Create a connection for socket.io
let server = http.createServer(app);
let io = socketio(server);

io.on('connection', function (socket) {
    // Notify in console that socket.io connection is created.
    console.log("New client connected");

    stocks.addClient(socket);
    stocks.notifyClients();

    // The contents of that message is then send back to client.
    socket.on('refresh', (message) => {
        io.emit('Update', message);
    });
});

// Start router
server.listen(port, () => {
    console.log('Server startet on port: ' + port);
});