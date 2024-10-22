# Doctor Management API

This project provides a simple API to manage doctor profiles with image upload functionality using Node.js, MongoDB, and Multer for file handling.

## Features

- Add new doctors with image uploads (stored in MongoDB).
- Data validation for fields like email, password, etc.
- Secure password storage using bcrypt.
- JWT authentication for security.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Bcrypt for password hashing
- Validator for form validation
- Cloudinary for image uploads
- JWT for authentication

## Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- Node.js
- MongoDB (local or remote)
- Cloudinary Account (if using for image storage)

## Getting Started

### Install Dependencies

```bash
npm init
npm i express mongoose multer bcrypt cloudinary cors dotenv jsonwebtoken nodemon validator 



