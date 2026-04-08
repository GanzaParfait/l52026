const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    price: Number,
    quantity: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);