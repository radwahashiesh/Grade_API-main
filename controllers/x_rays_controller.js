const { schema } = require('../models/x_rays');
const raysModel = require('../models/x_rays');


const getAllrays = async (req, res) => {
    const rays = await raysModel.find({  })
    res.status(200).json({ rays });
  };

  const addray = async (req, res) => {
    try {
        const rays = new raysModel(req.body)
        await rays.save()
        res.status(200).send({
            apiStatus: true,
            msg: "New ray added successfully",
            data: rays
        });
    }
    catch (e) {
        res.status(500).send({
            apiStatus: false,
            msg: "addation ray faild!",
            data: e.message
        });
    }
}


/////get one x_ray
const get_ray = async (req, res) => {
  const name = req.params.name
  //const { name } = req.body;
  const ray = await raysModel.findOne({ name });
 // res.status(200).json({ drugs });
  if (!ray) {
      res.status(404).json({ msg: 'No x_ray for this name '+name });
    }
    res.status(200).json({ ray });
};


  /////update drug
  const update_ray = async (req, res) => {
    try {
      let x_ray = await raysModel.findById(req.params.id);
      if (!x_ray) {
        return res.status(500).json({
          success: false,
          msg: "X_ray Not Found",
        });
      }
      ray = await raysModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
  
      return res.status(200).json({
        success: true,
        msg: "X_Ray Updated",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
///delete

  const delete_ray = async (req, res) => {
    try {
      let x_ray = await raysModel.findById(req.params.id);
      if (!x_ray) {
        return res.status(500).json({
          success: false,
          msg: "X_Ray Not Found",
        });
      }
      x_ray = await raysModel.findByIdAndDelete(req.params.id, {
        
        runValidators: true,
        useFindAndModify: false,
      });
  
      return res.status(200).json({
        success: true,
        msg: "X_Ray deleted",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


  module.exports={
    getAllrays,
    addray,
    update_ray,
    delete_ray,
    get_ray
  };