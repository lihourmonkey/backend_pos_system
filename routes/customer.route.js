const express = require("express")
const { create, findAll, findOne, update, remove } = require("../controllers/customer.controller")

const router = express.Router()

router
    .route("/")
    .get(findAll)
    .post(create)

router
    .route("/:id")
    .get(findOne)
    .patch(update)
    .delete(remove)

module.exports = router