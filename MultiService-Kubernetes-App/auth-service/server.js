const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
    res.json({ message: "Login success (mock)" });
});

app.post("/register", (req, res) => {
    res.json({ message: "Register success (mock)" });
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3001, () => console.log("Auth Service running on 3001"));
