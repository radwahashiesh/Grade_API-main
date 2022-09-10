 const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const adminModel = require('../models/adminModel');

const registeradmin = async (req, res) => {
    try {
        const {password,user_name
          
        }=req.body;
        //check if user Already exist in DB or not
       const admin = await adminModel.findOne({ user_name});
       //return this message if user exist in db
  if (admin) return res.status(400).json({ msg: "This user Already Exist" });
  //check length of password
  if (password.length < 4)
    return res.status(400).json({ msg: "Password must be More Than 3" });

    // ecrypt password
  const passwordHash = await bcrypt.hash(password, 10);

  const newAdmin = new adminModel({
    user_name,
    password: passwordHash,
          
  });
  const accesstoken = createAccessToken({ id: newAdmin._id })
  //To Save In DB U Can USed Create But this is anthor way
  await newAdmin.save();
        res.status(200).send({
            apiStatus: true,
            msg: "New admin added successfully",
            data: newAdmin,
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
      const { user_name, password } = req.body;
      const admin = await adminModel.findOne({ user_name });
      if (!admin) return res.status(500).json({ msg: "Enter Valid User_name" });
      
      const pass=admin.password;


      if (!pass) return res.status(500).json({ msg: "Incoorect Password" });
      //if login success create access Token And Refresh Token
      // create JWT For Authentication
      const accesstoken = createAccessToken({ id: admin._id });
      res.status(200).json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "11m" });
  };



  module.exports= {
    login,registeradmin
  } 


