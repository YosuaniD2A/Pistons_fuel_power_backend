const bcryptjs = require('bcryptjs')
const { getAllInfluencersModel, registrarInfluencer, getInfluencerById, getInfluencerByEmail, getInfluencerByCode, updateInfluencerModel, changeInfluencerStatusModel, getAllCodesModel, deleteInfluencerModel, changeInfluencerNotifyModel, getCodeDescountModel } = require('../models/influencers.model');
const { isValidId, isValidCode, isValidEmail } = require('../validations/validations');
const { generatorCode } = require('../util/codeGenerator');
const { generateTokenInfluencer } = require('../util/tokenGenerator');
const { getByPromotionalCodeByMonthsModel } = require('../models/orders.model');
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SK)

const login = async (req, res) => {
    const { emailOrCode, password } = req.body
    try {
      // verificar si el email existe
      let [influencer] = await getInfluencerByEmail(emailOrCode)
  
      if (!influencer[0]) {
        // 2da verificacion, ahora por el code
        [influencer] = await getInfluencerByCode(emailOrCode);

        if (!influencer[0]) {
            return res.status(404).json({
                msg: 'Email/Code are not correct'
              });   
        }
      }
  
      // verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, influencer[0].password);
      if (!validPassword) {
        return res.status(404).json({
          msg: 'The password is not correct'
        });
      }
  
      delete influencer[0].password;
  
      // Muestra mensaje de BIENVENIDA y Genera el Token si todo va bien
      res.status(200).json({
        msg: `Bienvenido/a ${influencer[0].fullname}`,
        token: generateTokenInfluencer(influencer[0]),
        influencer: influencer[0]
      })
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  
  }

const register = async (req, res) => {
    try {
        // Encripta el password que manda el usuario 
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
        // req.body.discount_code = await generatorCode();

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
            [data] = await getInfluencerById(req.params.value);
        } else if (isValidCode(req.params.value)) {
            [data] = await getInfluencerByCode(req.params.value);
        } else if (isValidEmail(req.params.value)) {
            [data] = await getInfluencerByEmail(req.params.value);
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


const updateInfluencer = async (req, res) => {
    try {
        if (req.body.password) {
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

const changeInfluencerNotify = async (req, res) => {
    try {
        const [data] = await changeInfluencerNotifyModel(req.params.id);

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

//------------------------------------------------------------------------------------------------------------------------

const getAllDiscountCoupons = async (req, res) => {
    try {
        const coupons = await stripe.coupons.list({ limit:20})

        res.send({
            coupons: coupons.data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getAllPromotionalCodes = async (req, res) => {
    try {
        const promotionalCodes = await stripe.promotionCodes.list({
            limit: 30
          });
          

        res.send({
            promotionalCodes: promotionalCodes.data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getAllUsedCodes = async (req, res) => {
    try {
         const [usedCodes] = await getAllCodesModel();

        res.send({
            usedCodes
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const getAllOrdersWithMyCode = async (req, res) => {
    try {
        const [orders] = await getByPromotionalCodeByMonthsModel(req.params.code);

        res.send({
            orders
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

//revisar si se esta usando este bloque
const getCodeDescount = async (req, res) => {
    try {
        const [discount] = await getCodeDescountModel(req.params.code);

        res.send({
            discount
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}


module.exports = {
    login,
    register,
    getAllInfluencers,
    getInfluencer,
    getAllDiscountCoupons,
    getAllPromotionalCodes,
    getAllUsedCodes,
    updateInfluencer,
    changeInfluencerStatus,
    changeInfluencerNotify,
    deleteInfluencer,

    getAllOrdersWithMyCode,
    getCodeDescount
}