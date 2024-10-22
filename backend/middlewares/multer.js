
<<<<<<< HEAD

import multer from "multer";
import path from 'path'

=======

import multer from 'multer';
import path from 'path';
>>>>>>> fdcd8606e0b6bf3c36c7aa47e322223ebdcaffeb

// Configure multer storage
const storage = multer.diskStorage({
    
<<<<<<< HEAD
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
=======
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
    },
});
>>>>>>> fdcd8606e0b6bf3c36c7aa47e322223ebdcaffeb

// Initialize multer with the storage configuration
const upload = multer({ storage });

<<<<<<< HEAD
const upload = multer({ storage})
// console.log("Image uploaded successfully.", upload);


export default upload
=======
export default upload;
>>>>>>> fdcd8606e0b6bf3c36c7aa47e322223ebdcaffeb
