const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// Product's Report
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        const totalProducts = products.length;

        const totalValue = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        const totalProfit = products.reduce((total, product) => total + ((product.price - product.cost) * product.quantity), 0);
        const newProducts = products.filter(product => new Date(product.date).toDateString() === new Date().toDateString()).length;

        res.status(200).json({
            message: "Report's details fetched successfully",
            totalProducts,
            totalValue,
            totalProfit,
            newProducts
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch report's details, Please try again." });
    }
});

// Get sales report for a specific date range
router.get("/sales", async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const products = await Product.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const totalSales = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        const totalCost = products.reduce((total, product) => total + (product.cost * product.quantity), 0);
        const totalProfit = totalSales - totalCost;

        res.status(200).json({
            message: "Sales report fetched successfully",
            totalSales,
            totalCost,
            totalProfit
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch sales report, Please try again." });
    }
});

module.exports = router;
