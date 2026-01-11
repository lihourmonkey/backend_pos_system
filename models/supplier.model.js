const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    bussinessName: {
        type: String,
        unique: true,
        required: [true, "bussiness name is required"]
    },

    name: {
        type: String,
        required: [true, "name is required"]
    },

    phone: {
        type: String
    },

    address: {
        type: String
    },

    note: {
        type: String
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
})

const Supplier = mongoose.model("Supplier", schema)

module.exports = Supplier