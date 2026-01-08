const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name is required"]
    },

    note: {
        type: String
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
})

const Category = mongoose.model("category", schema)

module.exports = Category