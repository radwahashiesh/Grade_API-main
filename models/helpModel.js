const mongoose = require("mongoose");
const HelpSchema = mongoose.Schema({
   
    message: { type: String, trim: true, required: true },

})
module.exports = mongoose.model("helpModel", HelpSchema);
