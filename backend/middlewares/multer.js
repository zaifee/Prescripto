

import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

export default upload;
