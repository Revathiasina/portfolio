
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const os = require('os');
const { exec, spawn } = require('child_process');

require('dotenv').config();

let { SERVER_PORT } = process.env;

SERVER_PORT = SERVER_PORT || 5050;

// Initialize Express
let app = express();

const controller = require('./src/controller/index');

const connection = require('./src/mongooseConnection');


// Parse request body as JSON
app.use(express.json({ limit: '102mb', parameterLimit: '102mb' }));

app.use(express.urlencoded({ extended: false, limit: '102mb' }));

// default
app.get('/', (req, res) => {
    console.log('Server is working on port ' + SERVER_PORT + '.');
    res.send('Server is working');
});

app.get('/portfolio/', controller.portfolioController.getPortfolio)
app.post('/portfolio/addTrade', controller.portfolioController.addTrade)
app.post('/portfolio/updateTrade', controller.portfolioController.updateTrade)
app.post('/portfolio/deleteTrade', controller.portfolioController.deleteTrade)
app.get('/portfolio/holdings',controller.portfolioController.getHoldings)
app.get('/portfolio/returns',controller.portfolioController.getReturns)

app.listen(SERVER_PORT, function () {
    console.log('Listening on port ' + SERVER_PORT + '.');
    connection.connect();
});
