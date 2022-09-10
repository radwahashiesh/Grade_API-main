const mongoose = require("mongoose");

const drugsSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: String, trim: true, required: true },
  about: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
});

const Drugs = mongoose.model("Drugs", drugsSchema, "Drugs");
module.exports = Drugs;
