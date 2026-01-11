const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
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

const Customer = mongoose.model("Customer", schema)

module.exports = Customer