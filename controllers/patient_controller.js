const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const patientModel = require('../models/patient');


const getAllPateient=async(req,res)=>{
  const allPaient=await patientModel.find()
  if(!allPaient) return res.status(500).json({msg:"Not Patient Found"})
  res.status(200).json(
    {
        status:"Success",
        count:allPaient.length,
        allPaient
      
      })
}

const registerPatient = async (req, res) => {
        try {
            const {name,patient_email,patient_password,
              DOB,phone,history_of_disease,disease_type,
              status,doc_id,city_id,treat_id,doctor
            }=req.body;
            //check if user Already exist in DB or not
           const user = await patientModel.findOne({ patient_email});
           //return this message if user exist in db
      if (user) return res.status(400).json({ msg: "This user Already Exist" });
      //check length of password
      if (patient_password.length < 6)
        return res.status(400).json({ msg: "Password must be More Than 5" });

        // ecrypt password
      const passwordHash = await bcrypt.hash(patient_password, 10);

      const newUser = new patientModel({
              name,
              patient_email,
              DOB,
              phone,
              history_of_disease,
              disease_type,
              status,doc_id,
              city_id,
              treat_id,
              patient_password: passwordHash,
              doctor
              
      });
      const accesstoken = createAccessToken({ id: newUser._id })
      //To Save In DB U Can USed Create But this is anthor way
      await newUser.save();
            res.status(200).send({
                apiStatus: true,
                msg: "New patient added successfully",
                data: newUser,
                accesstoken
            });
        }
        catch (error) {
          return res.status(500).json({ msg: error.message });
        }
    }
//  //login
 const login = async (req, res) => {
  try {
    const { patient_email, patient_password } = req.body;
    const user = await patientModel.findOne({ patient_email });
    if (!user) return res.status(500).json({ msg: "Enter Valid Email" });
    const isMatch = await bcrypt.compare(patient_password, user.patient_password);
    if (!isMatch) return res.status(500).json({ msg: "Incoorect Password" });
    //if login success create access Token And Refresh Token
    // create JWT For Authentication
    const accesstoken = createAccessToken({ id: user._id });
    res.status(200).json({ accesstoken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

  //forget password
const forgetPassword = async (req, res) => {
 try{
  const { patient_email } = req.body;
  const patient = await patientModel.findOne({ patient_email });
  if (!patient) return res.status(400).json({ msg: "patient Not Found" ,dir:0});
  res.status(200).json({ msg: 'Success! Go to Reset Password',dir:1 })
 }catch(error){
  return res.status(500).json({ msg: error.message });

 }
};


//reset password
const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword, patient_email} = req.body;
  if (!newPassword || !confirmPassword ) {
    res.status(400).json({msg: 'confirm didnot match new password'})
  }
  const patient = await patientModel.findOne({ patient_email  });
if(!patient) return res.status(500).json({msg:"not fount this email"})
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password Must be Match ConfirmPassword" });
  }
  const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
  patient.patient_password = passwordHash;
  await patient.save();
  res.status(200).json({msg: 'password reset success'})
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "11m" });
};
  
  module.exports= {
    getAllPateient,
    registerPatient,login,forgetPassword,resetPassword
  }
   


