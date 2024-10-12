
// import bodyParser from "body-parser";
// import express from "express";
import multer from "multer";
// const app = express()

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//disc storage 
const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }

})

const upload = multer({ storage:storage})

export default upload