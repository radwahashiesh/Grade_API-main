const ContactModel = require('../models/contactUs');

const cotactus=async(req,res)=>{
    const {name,email,message}=req.body
    if(!name || !email || !message){
        res.status(500).json({msg:"enter All Fiels"})
    }


    const newUser = new ContactModel({
        name,email,
        message
              
      });
      await newUser.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Done",
    });
}

const getAll=async(req,res)=>{
const alldata=await ContactModel.find();
if(!alldata){
    return res.status(500).json({msg:"Not Data Found"})
}
res.status(200).json({data:alldata,count:alldata.length})
}

module.exports={cotactus,getAll}