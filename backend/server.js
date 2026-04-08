const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/products", require("./routes/products"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/stock_v2")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
