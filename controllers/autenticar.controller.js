const User = require("../models/user.model");
const controller = {};
const httpError = require("http-errors");
const debug = require("debug")("app:autenticar-controller");

const createTransport =require("../mail/mail")
const { createToken, verifyToken } = require("../utils/jwt.tools");
controller.register = async (req, res, next) => {
  //la peticion, la respuesta y la siguiente funcion
  try {
    const {
      name_u,
      lastName_u,
      fechaNacimiento_u,
      dui_u,
      direccion_u,
      numero_tel_u,
      numero_tel_emer_u,
      genero_u,
      correo_u,
      password,
    } = req.body;

    const user = await User.findOne({ $or: [{ correo_u: correo_u }] });

    if (user) {
      throw httpError(409, "Ya existe esta cuenta");
    }

    const newUser = new User({
      name_u: name_u,
      lastName_u: lastName_u,
      fechaNacimiento_u: fechaNacimiento_u,
      dui_u: dui_u,
      direccion_u: direccion_u,
      numero_tel_u: numero_tel_u,
      numero_tel_emer_u: numero_tel_emer_u,
      genero_u: genero_u,
      correo_u: correo_u,
      password: password,
    });

    await newUser.save();
    createTransport(correo_u);

    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    next(error);
  }

  



};

  //LOGIN
  controller.login = async (req, res, next) => {
    try {
      const { correo_u, password } = req.body;

      // obteniendo informacion(correo,contraseña)
      const user = await User.findOne({ $or: [{ correo_u: correo_u }] });

      if (!user) {
        throw httpError(404, "El usuario no se ha encontrado");
      }

      //verificar contraseña si no coincide
      if (!user.comparePassword(password)) {
        throw httpError(401, "contraseña incorrecta");
      }
      ///Exisite y ya esta verificado

      const token = await createToken(user._id);

      //almacenar tokens
      let _tokens = [...user.tokens];
      //verifia la integridad de los tokens actuales
      const _verifiyPromise = _tokens.map(async (_t) => {
        const status = await verifyToken(_t);
        return status ? _t : null;
      });

      //5 sesionnes
      _tokens = (await Promise.all(_verifiyPromise))
        .filter(_t => _t)
        .slice(0, 4);

      //primera posicion(shitf)
      _tokens = [token, ..._tokens];
      user.tokens = _tokens;

      await user.save();

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };


  controller.logout = async (req, res, next) => {
    try {
      const { token } = req.body; // Supongo que estás enviando el token en el cuerpo de la solicitud
  
      // Verificar el token para asegurarse de que sea válido
      const decoded = await verifyToken(token);
  
      // Obtener el usuario asociado al token
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        throw httpError(404, "Usuario no encontrado");
      }
  
      // Eliminar el token de la lista de tokens del usuario
      user.tokens = user.tokens.filter((t) => t !== token);
  
      // Guardar el usuario actualizado en la base de datos
      await user.save();
      debug("Usuario después del logout:", user);
      return res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      next(error);
    }
  };

  controller.profile =async (req,res)=>{

    const {user}=req;
    }

  //enviar correo

module.exports = controller;
