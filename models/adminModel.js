const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  
  user_name: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  
});

const admin = mongoose.model("admin", adminSchema, "admin");
module.exports = admin;