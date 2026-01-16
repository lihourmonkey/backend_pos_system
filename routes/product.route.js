const express = require("express")
const { create, findAll, findOne, findOneByCode, update, remove } = require("../controllers/product.controller")

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

router.get("/code/:code", findOneByCode)

module.exports = router
