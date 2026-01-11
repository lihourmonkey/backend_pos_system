

const errorHandler = (err, req, res, next) => {

    let statusCode = 500
    let errMessage = "Server Error!"

    console.log(err)
    // handle validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(e => {
            return {
                path: e.path,
                message: e.message
            }
        })
        console.log(errors)
        statusCode = 400
        errMessage = errors
    }

    // handle duplicate key error
    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0]
        statusCode = 409
        errMessage = `Duplicate error code : ${field} must be unique`
    }


    // handle error while development
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            name: err.name,
            stack: err.stack,
            error: errMessage
        })
    } else {
        res.status(statusCode).json({
            success: false,
            error: errMessage
        })
    }

}

module.exports = { errorHandler }

