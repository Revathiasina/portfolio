const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const tradeCollection = require('../models/trade');
const portfolioCollection = require('../models/portfolio');

//function to get portfolios
const getPortfolio = async (req, res) => {
    try {
        const result = await tradeCollection.find();
        res.json({ success: true, data: result });
    } catch (error) {

    }
}

//function to add trade
const addTrade = async (req, res) => {
    try {
        const { stock, date, price, type } = req.body;
        const trade = await tradeCollection.create({ stock, date, price, type });

        let portfolio = await portfolioCollection.find({ stock });

        if (!portfolio) {
            await portfolioCollection.create({ trades: trade, stock });
        }

        res.json({ success: true, data: trade });
    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
}

//function to update trade
const updateTrade = async (req, res) => {
    try {
        const { stock, ...data } = req.body
        const trade = await tradeCollection.findOneAndUpdate({ stock }, data);
        res.json({ success: true, data: trade });
    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
}

//function to delete trade
const deleteTrade = async (req, res) => {
    try {
        const stock = req.body.stock
        await tradeCollection.deleteOne({ stock })
        res.json({ success: true, meesage: 'deleted sucessfully' });


    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
}

const getHoldings = async (req, res) => {
    try {
        const trades = await tradeCollection.find();

        const holdings = {}
        trades.map((trade) => {
            const stock = trade.stock;
            const price = trade.price;

            if (!holdings[stock]) {
                holdings[stock] = {
                    value: 0, stockValue: 0
                }
            } else {
                holdings[stock].value != price,
                    holdings[stock].stockValue++
            }
        })
        const key = Object.keys(holdings)
        res.json({ success: true, data: { [key]: `${holdings[key].value} @ ${holdings[key].stockValue}` } });
    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
}

const getReturns = async (req, res) => {
    try {
        const trades = await tradeCollection.find()

        const returns = {};
        trades.map((trade) => {
            const stock = trade.stock;
            const price = trade.price;

            if (!returns[stock]) {
                returns[stock] = {
                    initialPrice: price,
                    finalPrice: 100
                };
            }
        })
        res.json({ success: true, data: returns });

    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
}


module.exports = {
    addTrade,
    getReturns,
    updateTrade,
    deleteTrade,
    getHoldings,
    getPortfolio,
}