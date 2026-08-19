const express = require("express");

const app = express();

const PORT = Number(process.env.PORT || 3000);
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Frontend is healthy"
    });
});

app.get("/", (req, res) => {
    res.render("index", {
        result: null
    });
});

app.post("/submit", async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            })
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const result = await response.json();

        res.render("index", {
            result: result
        });
    } catch (error) {
        console.error("Backend request failed:", error.message);

        res.render("index", {
            result: {
                status: "error",
                message: "Unable to connect to Flask backend."
            }
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
    console.log(`Backend URL: ${BACKEND_URL}`);
});
