const express = require("express");
const { errorHandler } = require("./helpers/errorHandler");

const categoryRouter = require("./routes/category.route")
const customerRouter = require("./routes/customer.route")
const supplierRouter = require("./routes/supplier.route");
const uploadRouter = require("./routes/upload.route")
const productRouter = require("./routes/product.route")

const app = express()

app.use(express.json()) // for create method in controllers

app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/supplier", supplierRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/product", productRouter)

// handle global error
app.use(errorHandler)

module.exports = app