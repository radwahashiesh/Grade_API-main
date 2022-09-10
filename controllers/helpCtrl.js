const helpModel = require('../models/helpModel');

const help=async(req,res)=>{
    const {message}=req.body
    if(!message){
        res.status(500).json({msg:"Enter Message "})
    }


    const newMessage = new helpModel({
        
        message
              
      });
      await newMessage.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Done",
    });
}

const getAll=async(req,res)=>{
const alldata=await helpModel.find();
if(!alldata){
    return res.status(500).json({msg:"Not Data Found"})
}
res.status(200).json({data:alldata,count:alldata.length})
}

module.exports={help,getAll}