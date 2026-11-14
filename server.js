
const express = require("express");
const sayings = require("./data/sayings.json");

const app = express();

app.use(express.json());

// GET ALL SAYINGS
app.get("/api/sayings", (req, res) => {
    res.json(sayings);
});

// RANDOM SAYING ENDPOINT
app.get("/api/sayings/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * sayings.length);
    const randomSaying = sayings[randomIndex];

    res.json(randomSaying);
});

// ID ENDPOINT
app.get("/api/sayings/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const saying = sayings.find((s) => s.id === id);

    if (!saying) {
        return res.status(404).json({
            error: "Saying not found"
        });
    }

    res.json(saying);
});

// Export Express application for Vercel
module.exports = app;

// Start local server when running directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Sauce API running at http://localhost:${PORT}`);
    });
}
