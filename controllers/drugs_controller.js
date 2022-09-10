const { schema } = require('../models/drugs_model');
const drugsModel = require('../models/drugs_model');
//const handler=require('express-async-handler');
//const slugify=require('slugify');

/* const getAllrays = async (req, res) => {
    const drugs = await drugsModel.findOne({ name });
    res.status(200).json({ rays });
  }; */

  const add_drug = async (req, res) => {
    try {
        const drugs = new drugsModel(req.body)
        await drugs.save()
        res.status(200).send({
            apiStatus: true,
            msg: "New drug added successfully",
            data: drugs
        });
    }
    catch (e) {
        res.status(500).send({
            apiStatus: false,
            msg: "addation drug faild!",
            data: e.message
        });
    }
}

const get_drugs = async (req, res) => {
    //const name = req.params.name
    const { name } = req.body;
    const drugs = await drugsModel.findOne({ name });
   // res.status(200).json({ drugs });
    if (!drugs) {
        res.status(404).json({ msg: 'No drug for this name '+name });
      }
      res.status(200).json({ drugs });
  };

  /////update drug
  const update_drug = async (req, res) => {
    try {
      let drug = await drugsModel.findById(req.params.id);
      if (!drug) {
        return res.status(500).json({
          success: false,
          msg: "Drug Not Found",
        });
      }
      drug = await drugsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
  
      return res.status(200).json({
        success: true,
        msg: "Drug Updated",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
///delete

  const delete_drug = async (req, res) => {
    try {
      let drug = await drugsModel.findById(req.params.id);
      if (!drug) {
        return res.status(500).json({
          success: false,
          msg: "Drug Not Found",
        });
      }
      drug = await drugsModel.findByIdAndDelete(req.params.id, {
        
        runValidators: true,
        useFindAndModify: false,
      });
  
      return res.status(200).json({
        success: true,
        msg: "Drug deleted",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  
const getAllDrug=async(req,res)=>{
  const alldrugs=await drugsModel.find()
  if(!alldrugs) return res.status(500).json({msg:"Not Drugs Found"})
  res.status(200).json(
    {
        status:"Success",
        
        alldrugs
      
      })
}




  module.exports={
    
    add_drug,get_drugs,update_drug,delete_drug,getAllDrug
  };