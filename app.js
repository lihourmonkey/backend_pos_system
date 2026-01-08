const express = require("express");
const categoryRouter = require("./routes/category.route");

const app = express()

app.get("/", (req, res) => {
    res.send("Hello Baboo");
})

app.use(express.json()) // for create method in controllers
app.use("/api/v1/category", categoryRouter)


// handle global error
app.use((err, req, res, next) => {

    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === "production" ? "Server Error" : err.stack
    })
})

module.exports = app