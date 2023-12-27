const { registrarUser, getUserByEmail, getUserById, getAllUsersModel, deleteUserModel, getUserModel } = require("../models/auth.model");
const bcryptjs = require('bcryptjs')
const { generateToken } = require("../util/tokenGenerator")


const login = async (req, res) => {
  const { email, password } = req.body
  try {
    // verificar si el email existe
    const [user] = await getUserByEmail(email)

    if (!user[0]) {
      return res.status(404).json({
        msg: 'Email / Password no son correctos - email'
      });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user[0].password);
    if (!validPassword) {
      return res.status(404).json({
        msg: 'Email / Password no son correctos - password'
      });
    }

    delete user[0].password;

    // Muestra mensaje de BIENVENIDA y Genera el Token si todo va bien
    res.status(200).json({
      msg: `Bienvenido/a ${user[0].name}`,
      token: generateToken(user[0]),
      user: user[0]
    })
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}

const register = async (req, res) => {
  try {
    // Encripta el password que manda el usuario 
    req.body.password = bcryptjs.hashSync(req.body.password, 10);

    // Registra sus datos en la BD y luego se obtienen el usuario a partir del id que se le asigna
    const [data] = await registrarUser(req.body);
    const [user] = await getUserById(data.insertId);

    delete user[0].password;

    // Muestra un mensaje SUCCESSFUL y genera un Token para este usuario
    res.status(200).send({
      msg: 'Su registro ha sido satisfactorio',
      token: generateToken(user[0]),
      user: user[0]
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const [data] = await getAllUsersModel();

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

const getUser = async (req, res) => {
  try {
    const [data] = await getUserModel(req.params.id);

    res.send({
      data
    })

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const [data] = await deleteUserModel(req.params.id);

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
  login,
  register,

  getAllUsers,
  getUser,
  deleteUser
}