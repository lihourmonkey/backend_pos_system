const Customer = require("../models/customer.model");


exports.create = async (req, res, next) => {

    try {

        const exist = await Customer.findOne({ name: req.body.name })

        if (exist) {
            res.status(409).json({
                success: false,
                error: "name is already existed!"
            })
        }

        const doc = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            result: doc
        })
    } catch (error) {
        next(error)
    }

}

exports.findAll = async (req, res, next) => {

    try {

        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 10
        const skip = (page - 1) * limit
        const querySearch = {}

        if (req.query.search) {
            querySearch["$or"] = [
                { name: { $regex: req.query.search, $options: "i" } }
            ]
        }

        const doc = await Customer.find(querySearch)
            .limit(limit)
            .skip(skip)
            .sort({ _id: -1 })
            .exec()

        // total record
        const totalItem = await Customer.find(querySearch).countDocuments();
        // total page
        const totalPage = Math.ceil(totalItem / limit);

        res.status(200).json({
            success: true,
            totalPage,
            result: doc
        })
    } catch (error) {
        next(error)
    }

}

exports.findOne = async (req, res, next) => {

    try {

        const id = req.params.id

        const doc = await Customer.findById(id);

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

exports.update = async (req, res, next) => {

    try {

        const id = req.params.id
        const doc = await Customer.findByIdAndUpdate(id, req.body, { new: true })

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

exports.remove = async (req, res, next) => {

    try {

        const id = req.params.id
        const doc = await Customer.findByIdAndDelete(id)

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