

import multer from "multer";
import path from 'path'


//disc storage 
const storage = multer.diskStorage({
    
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }

})

const upload = multer({ storage})
// console.log("Image uploaded successfully.", upload);


export default upload
