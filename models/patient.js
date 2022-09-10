const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true, },
  patient_email: { type: String, trim: true, required: true },
  patient_password: { type: String, trim: true, required: true },
  DOB: { type: Date,required: true },
  phone: { type: String, trim: true, required: true },
  history_of_disease: { type: String, trim: true, required: true },
  disease_type: { type: String, trim: true, required: true },
  status: { type: String, trim: true, required: true},
  doc_id: { type: mongoose.Schema.Types.ObjectId , ref:'Doctor' },
  city_id: { type: mongoose.Schema.Types.ObjectId , ref:'City' },
  treat_id: {type: mongoose.Schema.Types.ObjectId , ref:'Treatment_method' },
  doctor :{type: mongoose.Schema.Types.ObjectId,ref:'Doctor'}
});

const Patient = mongoose.model("Patient", patientSchema, "Patient");
module.exports = Patient;