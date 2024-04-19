const { Schema, model } = require('mongoose');


const PortfolioSchema = new Schema(
    {
        stock: { type: String, required: true },
        trades: { type: Array },
    },
    {
        timestamps: true,
    }
);


const PortfolioModel = model('portfolio', PortfolioSchema);

module.exports = PortfolioModel;