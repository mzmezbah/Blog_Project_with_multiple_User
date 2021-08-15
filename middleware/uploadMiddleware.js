const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})


const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        // const types = /.jpg| .jpeg|.png|.gif/
        // const extName = types.test(path.extname(file.originalname).toLowerCase())
        // // const mimeTypes = types.test(file.mimetype)

        // if (extName) {
        //     cb(null, true)
        // } else {    
        //     cb(new Error('Only Support Image'))
        // }
            let ext = path.extname(file.originalname).toLowerCase()
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                 req.fileValidationError = "Forbidden extension";
                 return cb(null, false, req.fileValidationError);
           }
           cb(null, true);
    }
})

module.exports = upload