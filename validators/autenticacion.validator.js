const { body, param } = require("express-validator");
const validators = {};


let passRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/;


validators.registrarUsuario = [
  body("name_u")
    .notEmpty()
    .withMessage("El campo nombre es requerido")
    .isLength({ min: 2, max: 40 }),
   body("lastName_u").notEmpty().withMessage("El campo 'Apellido es requerido'"),
  body("fechaNacimiento_u")
    .notEmpty()
    .withMessage("El campo Fecha de nacimiento es requerido"),
  body("dui_u").notEmpty().withMessage("El campo dui es requerido").isLength({min:10}),
  body("direccion_u").notEmpty().withMessage("El campo direccion es requerido").isLength({min:10,max:100}),
  body("numero_tel_u")
    .notEmpty()
    .withMessage("El campo telefeno es requerido")
    .isLength({ min: 9 }),
  body("numero_tel_emer_u")
    .notEmpty()
    .withMessage("El campo telefeno de emergencia es requerido")
    .isLength({ min: 9 }),
  body("genero_u").notEmpty().withMessage("El campo genero es requerido"),

  body("correo_u")
    .notEmpty()
    .withMessage("El campo Correo electronico es requerido")
    .isEmail()
    .withMessage("Correo electronico incorrecto")
    .isLength({ min: 10, max: 100 })
    .withMessage("exceso de caracteres"),
  body("password")
    .notEmpty()
    .withMessage("El campo Contraseña es requerido")
    .matches(passRegex)
    .withMessage(
      "Tiene que contenener al menos ocho caracteres, incluido al menos un número, e incluye letras mayúsculas y minúsculas y caracteres especiales"
    ),
];

module.exports = validators;
