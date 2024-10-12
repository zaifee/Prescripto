import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

// const path = require("path");

//app config
const app = express()
app.set("views", path.resolve("./views"));
const port = process.env.PORT || 4000
connectDB()

//middleware
app.use(express.json())

// it will allow frontend to connect with backend
app.use(cors())

//api end points 
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin


app.get('/', (req, res) => {
    res.send('API WORKING Great')
})

app.listen(port, ()=> console.log("Server started ", port))

