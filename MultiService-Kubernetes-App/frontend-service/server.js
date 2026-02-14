const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", async (req, res) => {
    const products = await axios.get("http://backend-service/products");
    res.send(`
        <h1>Frontend</h1>
        <p>Products: ${products.data.join(", ")}</p>
    `);
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3000, () => console.log("Frontend running on 3000"));
