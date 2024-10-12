import {v2 as cloudniary} from 'cloudinary'
import { connect } from 'mongoose'

const connectCloudinary = () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secretkey: process.env.CLOUDINARY_SECRETKEY

    })
}

export default connectCloudinary