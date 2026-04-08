const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    price: Number,
    quantity: Number,
    inStock: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);