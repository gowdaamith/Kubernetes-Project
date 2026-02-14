const express = require("express");
const axios = require("axios");
const app = express();

app.get("/products", async (req, res) => {
    res.json(["Laptop", "Mouse", "Keyboard"]);
});

app.get("/orders", async (req, res) => {
    res.json(["Order-1", "Order-2"]);
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3002, () => console.log("Backend Service running on 3002"));
