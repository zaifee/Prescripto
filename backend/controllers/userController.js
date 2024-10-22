import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
// api to register user 
const registerUser = async(req, res) => {
    try {
        
        const {name, email, password} = req.body;

        if(!name || !password || !email){
            res.json({success: false, message:"Missing Details"})
        }

        // validating emai

        if(!validator.isEmail(email)){
            return  res.json({success: false, message:"enter a valid email"})
        }

        // valdating strong password
        if(password.length < 8){
            return  res.json({success: false, message:"enter a minimum 8 length password"})
        }


        // hasing use password 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save();

        // creating atoken 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }


}



// api for user login 
const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            //it will terminate the request after sending the response 
           return res.json ({success: false, message:'User does not exist'})
        }
        // if user not exist say for registeration 
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
            
        }else{
            res.json({success: false, message: 'Invalid credentials'})
        }


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// creating a api to get userProfle data 
const getProfile = async(req, res) => {
    try {
 // we will not get userId using this user should sent the token by using that token we will get id
    
    const {userId} = req.body;
    const  userData  = await userModel.findById(userId).select('-password');
    res.json({success:true, userData})
    

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }


}

// api to update to user profile 

const updateProfile = async(req, res) =>{
try {
    const {userId, name, phone, address, dob, gender} = req.body;
    const imageFile = req.file;

    console.log(req.body)

    if (!name || !phone  || !dob ||  !gender) {
        return res.json({success: false, message:"Data missing"})
    }
    console.log("hello");E


    await userModel.findByIdAndUpdate(userId, {name, phone,
         address:JSON.parse(address), dob, gender})

    if(imageFile){

        // upload image to cloudinary 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, 
            {resource_type: 'image'})
        const imageUrl = imageUpload.secure_url; 

        await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        
    }
    res.json({success: true, message:'Profile Updated'})


    

 } catch (error) {
    console.log(error);
    res.json({success: false, message:error.message})
    
}
}


// api to book appoinment 
const bookAppointment = async(req, res) => {

    try {
        const {userId, docId, slotDate, slotTime} = req.body;

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            console.log('checking availability.');
            res.json({success: false, message:"Doctor Not available"})
        }

        let slots_booked = docData.slots_booked
        // checking slots availability
        if(slots_booked[slotDate]){
           if( slots_booked[slotDate].includes(slotTime)){
            // return nhi likha tha
            return res.json({success: false, message:"Slots Not available"})
           }else{
                slots_booked[slotDate].push(slotTime)
           }

        }else{
            // if we no one booked slot on that date
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }


        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked 

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fee,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

    
        // save new slot data in doctor data 
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true, message:'Appointment Booked'})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }

}


export  {registerUser, userLogin, getProfile, updateProfile, bookAppointment}