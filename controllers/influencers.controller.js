const bcryptjs = require('bcryptjs')
const { getAllInfluencersModel, registrarInfluencer, getInfluencerById, getInfluencerByEmail, getInfluencerByCode, updateInfluencerModel, changeInfluencerStatusModel, getAllCodesModel, deleteInfluencerModel } = require('../models/influencers.model');
const { isValidId, isValidCode, isValidEmail } = require('../validations/validations');


const register = async (req, res) => {
  try {
    // Encripta el password que manda el usuario 
    req.body.password = bcryptjs.hashSync(req.body.password, 10);

    // Registra sus datos en la BD y luego se obtienen el usuario a partir del id que se le asigna
    const [data] = await registrarInfluencer(req.body);
    const [influencer] = await getInfluencerById(data.insertId);

    delete influencer[0].password;

    // Muestra un mensaje SUCCESSFUL
    res.status(200).send({
      msg: 'Su registro ha sido satisfactorio',
      influencer: influencer[0]
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}


const getAllInfluencers = async (req, res) => {
  try {
    const [data] = await getAllInfluencersModel();

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

const getInfluencer = async (req, res) => {
  try {
    let data;

    if (isValidId(req.params.value)) {
      data = await getInfluencerById(req.params.value);
    } else if (isValidCode(req.params.value)) {
      data = await getInfluencerByCode(req.params.value);
    } else if (isValidEmail(req.params.value)) {
      data = await getInfluencerByEmail(req.params.value);
    } else {
      return res.status(400).json({ msg: 'Invalid identifier' });
    }

    if (!data) {
      return res.status(404).json({ msg: 'Influencer not found' });
    }

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

const getAllCodes = async (req, res) => {
    try {
      const [data] = await getAllCodesModel();
  
      res.send({
        data
      })
  
    } catch (error) {
      res.status(500).json({
        msg: error.message
      });
    }
  }

const updateInfluencer = async (req, res) => {
  try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    
    const [data] = await updateInfluencerModel(req.body, req.params.id);

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

const changeInfluencerStatus = async (req, res) => {
    try {
      const [data] = await changeInfluencerStatusModel(req.params.id);
  
      res.send({
        data
      })
  
    } catch (error) {
      res.status(500).json({
        msg: error.message
      });
    }
  }

const deleteInfluencer = async (req, res) => {
  try {
    const [data] = await deleteInfluencerModel(req.params.id);

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

module.exports = {
  register,
  getAllInfluencers,
  getInfluencer,
  getAllCodes,
  updateInfluencer,
  changeInfluencerStatus,
  deleteInfluencer
}