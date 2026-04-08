const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product
router.post('/', async (req, res) => {
    const product = new Product(req.body);  
    try {
        const savedProduct = await product.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: `${products.length} Products fetched successfully`, products });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: `${product.name}'s details fetched successfully`, product });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: `${updatedProduct.name} updated successfully`, product: updatedProduct });

    } catch (err) {
        res.status(400).json({ message: "Failed to update product" });
    }
});


// Delete a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: `${deletedProduct.name} deleted successfully`, product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
})

module.exports = router;
