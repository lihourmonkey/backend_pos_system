const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, "password is required"]
    },
    role: {
        type: String,
        enum: ["super", "admin", "cashier"],
        required: [true, "role is required"]
    }
}, { timestamps: true })

const User = mongoose.model("User", schema)

module.exports = User