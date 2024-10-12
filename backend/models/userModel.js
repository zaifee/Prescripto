import mongoose from "mongoose";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:"https://www.pngwing.com/en/free-png-augve",
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "000000000" },
});

const doctorModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default doctorModel;
