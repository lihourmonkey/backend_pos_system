const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

exports.signup = async (req, res, next) => {
    try {

        if(!req.body.password){
            return res.status(400).json({
                success: false,
                error: "Password is required"
            })
        }

        const password = await bcryptjs.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password
        })

        delete newUser.password

        res.status(201).json({
            success: true,
            result: newUser
        })

    } catch (error) {
        next(error)
    }
}

exports.signin = async (req, res, next) => {
    try {

        const {email, password} = req.body;
        //1). validate email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                error: "email and password are required!"
            })
        }

        //2). find email if exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success: false,
                error: "Unauthorization"
            })
        }

        //3). compare password
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({
                success: false,
                error: "password does not match"
            })
        }
        
        //4). create token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })

        //5). set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            domain: "localhost",
            sameSite: "Strict"
        })
        
        res.status(200).json({
            success: true,
            result: {
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        })
    } catch (error) {
        next(error)
    }
}