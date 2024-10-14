
// import bodyParser from "body-parser";
// import express from "express";
import multer from "multer";
import path from 'path'
// const app = express()

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//disc storage 
const storage = multer.diskStorage({
    
    // filename: function(req, file, callback){
    //     callback(null + path.extname(file.originalname));
    // }
    filename: function(req, file, callback){
        callback(null + path.extname(file.originalname));
    },

})

const upload = multer({ storage})

export default upload