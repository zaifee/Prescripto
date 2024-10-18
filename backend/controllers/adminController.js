import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary' 
import doctorModel from "../models/doctorModel.js"
import connectCloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'

// // api for adding doctor
const addDoctor = async (req, res) => {

    try{
        const {name, email, password, speciality, degree, experience, about, fee, address} = req.body
        // we will pass data in the form of form so we need a middleware
        
        const imageFile = req.file;
        // console.log("value of imageFile is: ", imageFile);

        

        //checking for all data to add doctor 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address){
            return res.json({success:false, message: "Missing details"})
        }


        // validating email 
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter valid email"})
        }

        //validating string password 
        if(password.length < 8){
            return res.json({success:false, message: "Please enter a strong password"})
        }


//         // hashing doctor password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


//         //--------------------this is not working -----------------
//         // // // upload img to cloudinary   
//         // await connectCloudinary()
       
//         // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
//         // const imageUrl = imageUpload.secure_url;

        
//         // upload img to cloudinary   
        // ----------so Using default image-------------------------
      
        let imageUrl; // Declare the imageUrl variable

        if (imageFile) {
            // Upload img to Cloudinary only if an image file is present
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
          
            
            imageUrl = imageUpload.secure_url;
            // console.log(imageUrl)
        } 
        else {
            // Use a default image URL if no image is provided -- this is executing always
            // imageUrl = "https://example.com/path/to/default-image.png"; // Replace with your actual default image URL
            imageUrl = "https://img.freepik.com/premium-photo/indian-female-doctor-indian-nurse_714173-201.jpg"
        }

        
        const doctorData = {
            name,
            email,
            image:imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address:JSON.parse(address), //it will store the address in obj form
            date:Date.now()
        }


        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message: "Doctor Added"})

        
    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message})
        
    }
}


// // API FOR ADMIN LOGIN 
const loginAdmin = async(req, res) => {
    try {
        // first we will get the email id and pass from req and we wil match that email and password with this env variables
        //it that matching we will create a token using jsonWebToken 
        const {email, password} = req.body;
        
       
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})

        }else{
            //if not matching 
            res.json({success: false, message: "Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
        
    }
}


export {addDoctor, loginAdmin}
