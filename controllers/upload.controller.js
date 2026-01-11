const multer = require("multer")
const path = require("path")
const fs = require("fs")

// make diskStorage
const diskStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, "../upload") // create folder
        fs.mkdirSync(folderPath, { recursive: true }) // dir that file store
        cb(null, folderPath)
    },

    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname) // define extension
        const filename = Date.now() + extName // define filename
        cb(null, filename)
    }

})

// define file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb( new Error("Only JPEG, JPG, PNG and GIF are allowed"), false )
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter,
    limits: {
        fieldSize: 5 * 1024 * 1024 // convert form MB to B (5MB)
    }
})

// function for upload file
exports.uploadFile = (req, res) => {
    try {
        
        upload.single("imageUrl")(req, res, (err) => {

            if(err){
                return res.status(400).json({
                    success: false,
                    error: err.message
                })
            }

            if(!req.file){
                return res.status(400).json({
                    success: false,
                    error: "There's no file provide!"
                })
            }

            res.status(200).json({
                success: true,
                message: " Image upload successfully!",
                filename: req.file.filename
            })

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Upload failed!"
        })
    }
}

// function for remove file 
exports.removeFile = (req, res) => {
    try {
        
        const imagePath = path.join(__dirname, "../upload", req.params.imageUrl)

        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
            return res.status(200).json({
                success: true,
                message: "Deleted image successfully !"
            })
        }else{
            return res.status(404).json({
                success: false,
                error: "Image not found!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error while deleting image!"
        })
    }
}

