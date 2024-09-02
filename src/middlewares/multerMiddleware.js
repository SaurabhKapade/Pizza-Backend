const multer = require('multer');
const path = require('path')
const storageconfiguration = multer.diskStorage({
    destination:(req,file,next)=>{
        next(null,'uploads/')
    },
    filename:(req,file,next)=>{
        next(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploader = multer({storage:storageconfiguration});
module.exports = {
    uploader
}
