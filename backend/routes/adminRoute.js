import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/adminController.js' 
import upload from '../middlewares/multer.js'
import multer from 'multer'
import authAdmin from '../middlewares/authAdmin.js';


//first we need to create router instance 

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin) 


export default adminRouter
