const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

// Display form
app.get("/", (req, res) => {
    res.render("index", {
        result: null
    });
});

// Handle form submission
app.post("/submit", async (req, res) => {
    try {
        const response = await fetch("http://backend:5000/submit", {
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

        const result = await response.json();

        res.render("index", {
            result: result
        });
    } catch (error) {
        console.error(error);

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
});