const multer= require ('multer')
const cloudinary= require('cloudinary').v2
const {cloudinaryStorage} = require ('multer-storage-cloudinary')
require ('dotenv').config()

const internalStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads')
    },
    filename: (req,file,cb)=>{
        const uniqueRandomName= `${Date.now()}-${Math.floor(Math.random()*579990)}`
    const fileExtention= file.originalname.split('.').pop()
cb(null, `${file.fieldname}-${uniqueRandomName}.${fileExtention}`)

    }
})

const upload= multer({storage: internalStorage})

module.exports={
    upload,
}