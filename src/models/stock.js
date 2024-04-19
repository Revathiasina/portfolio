const { Schema, model } = require('mongoose');

const StockSchema = new Schema(
    {
        stock: String
    }
);

const StockModel = model('stock', StockSchema);

module.exports = StockModel;