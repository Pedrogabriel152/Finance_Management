import multer from 'multer'
import path from 'path'

// Destination to store the images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) =>{

        let folder = ""

        if(req.baseUrl.includes("recordcompany")) {
            folder = "recordcompany"
        } else if(req.baseUrl.includes("cd")) {
            folder = "cd"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const imageupload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb:any) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb.Error("Por favor, envie apenas jpg ou png")
        }

        cb(undefined, true)
    }
})

export default imageupload