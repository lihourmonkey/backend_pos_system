const express = require("express")
const { create } = require("../controllers/product.controller")

const router = express.Router()

router 
    .route("/")
    .post(create)

module.exports = router
