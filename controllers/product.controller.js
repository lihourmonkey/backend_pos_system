const Product = require("../models/product.model")
const { generateProductCode } = require("./counter.controller")


exports.create = async (req, res, next) => {

    try {
        
        const code = await generateProductCode()
        const newdoc = await Product.create({...req.body , code, currentStock: 0})

        res.status(201).json({
            success: true,
            result: newdoc
        })

    } catch (error) {
        next(error)
    }

}