const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    code: {
        type: String,
        unique: true,
        required: [true, "code product is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"]
    },
    costPrice: {
        type: Number,
        required: [true, "Cost price is required"]
    },
    salePrice: {
        type: Number,
        required: [true, "Sale price is required"]
    },
    currentStock: {
        type: Number,
        min: [0, "current stock must be greater than zero"],
        default: 0
    },
    note: {
        type: String
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
})

const Product = mongoose.model("Product", schema)

module.exports = Product