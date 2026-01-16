const Product = require("../models/product.model")
const { generateProductCode } = require("./counter.controller")

// create product
exports.create = async (req, res, next) => {

    try {

        const code = await generateProductCode()
        const newdoc = await Product.create({ ...req.body, code, currentStock: 0 })

        res.status(201).json({
            success: true,
            result: newdoc
        })

    } catch (error) {
        next(error)
    }

}

// find all product
exports.findAll = async (req, res, next) => {
    try {

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        const querySearch = {};
        let sortOption = "";

        // advanced filtering
        const reservedField = ["page", "limit", "sort", "search"];
        const queryFilters = { ...req.query };
        reservedField.forEach((field) => delete queryFilters[field]);

        // Handle advanced filtering 
        const filterString = JSON
            .stringify(queryFilters)
            .replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`)

        const filters = JSON.parse(filterString)

        // search
        if (req.query.search) {
            querySearch["$or"] = [
                { name: { $regex: req.query.search, $options: "i" } },
                { code: { $regex: req.query.search, $options: "i" } }
            ]
        }

        // sort
        if (req.query.sort) {
            sortOption = req.query.sort
        } else {
            sortOption = "-_id"
        }

        const docs = await Product.find({ ...querySearch, ...filters })
            .populate("category", "name")
            .skip(skip)
            .limit(limit)
            .sort(sortOption)
            .exec()

        const totalItem = await Product.find(querySearch).countDocuments()
        const totalPage = Math.ceil(totalItem / limit)

        res.status(200).json({
            success: true,
            totalPage,
            result: docs
        })

    } catch (error) {
        next(error)
    }
}

// find one by id
exports.findOne = async (req, res, next) => {
    try {

        const id = req.params.id;
        const doc = await Product.findById(id).populate("category", "name")

        res.status(200).json({
            success: true,
            result: doc
        })

    } catch (error) {
        next(error)
    }
}

// find one by code 
exports.findOneByCode = async (req, res, next) => {
    try {

        const code = req.params.code;
        const doc = await Product.find({ code }).populate("category", "name")

        res.status(200).json({
            success: true,
            result: doc
        })

    } catch (error) {
        next(error)
    }
}

// update 
exports.update = async (req, res, next) => {

    try {

        const id = req.params.id
        const doc = await Product.findByIdAndUpdate(id, req.body, { new: true })

        if (!doc) {
            res.status(404).json({
                success: false,
                message: "Document not found!"
            })
        }

        res.status(200).json({
            success: true,
            result: doc
        })
    } catch (error) {
        next(error)
    }

}

// remove
exports.remove = async (req, res, next) => {

    try {

        const id = req.params.id
        const doc = await Product.findByIdAndDelete(id)

        if (!doc) {
            res.status(404).json({
                success: false,
                message: "Document not found!"
            })
        }

        res.status(200).json({
            success: true,
            result: "Deleted successfully!"
        })
    } catch (error) {
        next(error)
    }

}