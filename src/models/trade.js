const { Schema, model, default: mongoose } = require('mongoose');


const TradeSchema = new Schema(
    {
        stock: { type: String, required: true },
        date: { type: Date, required: true },
        price: { type: Number, required: true },
        type: { type: String, enum: ['buy', 'sell'], required: true },
    },
    {
        timestamps: true,
    }
);

const TradeModel = model('trade', TradeSchema);

module.exports = TradeModel;
