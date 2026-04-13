const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// Product's Report
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        const totalProducts = products.length;
        const { startDate, endDate } = req.query;

        // Filter products based on date range if provided
        let filter = {};

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // ✅ VERY IMPORTANT
            end.setHours(23, 59, 59, 999);
            filter.date = {
                $gte: start,
                $lte: end
            };
        }

        const filteredProducts = await Product.find(filter);

        const totalValue = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        const totalProfit = products.reduce((total, product) => total + ((product.price - product.cost) * product.quantity), 0);
        const newProducts = products.filter(product => new Date(product.date).toDateString() === new Date().toDateString()).length;

        res.status(200).json({
            message: "Report's details fetched successfully",
            totalProducts,
            totalValue,
            totalProfit,
            newProducts,
            products,
            filteredProducts
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch report's details, Please try again." });
    }
});

module.exports = router;
