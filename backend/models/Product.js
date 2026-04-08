const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: Number,
    price: Number,
    quantity: Number,
    category: String,
    inStock: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Product", ProductSchema);
