const express = require("express")

const app = express()

app.get("/" , (req,res) => {
    res.send("Hello Baboo");
})

module.exports = app