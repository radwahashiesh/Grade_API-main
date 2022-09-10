const mongoose = require("mongoose");

const xraySchema = mongoose.Schema({
  photo: { type: String},
  name: { type: String, trim: true, required: true },
  government: { type: String, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  longitude: { type: String, trim: true, required: true },
  latitude: { type: String, trim: true, required: true },
  website: { type: String, trim: true, required: true },
  url: { type: String, trim: true, required: true },
  appoinment: { type: String, trim: true, required: true },
});

const xray = mongoose.model("xray", xraySchema, "xray");
module.exports = xray;