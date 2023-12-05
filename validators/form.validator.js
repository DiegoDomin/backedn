const { body, param } = require("express-validator");
const validators = {};

//se pasa el nombre del campo
validators.createFormValidator = [
  // noEMpty:nom venga vacio
  param("identifier").optional().isMongoId().withMessage("si"),
  body("name")
    .notEmpty()
    .withMessage("El campo 'nombre' es requerido")
    .isLength({ min: 4, max: 25 }),
  body("last_name")
    .notEmpty()
    .withMessage("El campo 'Apellido' es requerido")
    .isLength({ min: 4, max: 30 }),
  body("fecha_nacimiento")
    .notEmpty()
    .withMessage("El campo Fecha de nacimiento es requerido"),
  body("color_ca")
    .notEmpty()
    .withMessage("El campo color de cabello es requerido")
    .isLength({ min: 4, max: 40 }),
  body("tez").notEmpty().withMessage("El campo tez es requerido")
  .isLength({ min: 4, max: 25 }),
  body("color_ey")
    .notEmpty()
    .withMessage("El campo color de ojos es requerido")
    .isLength({ min: 4, max: 20 }),
  // body("discapacidad")
  //   .notEmpty()
  //   .withMessage("El campo discapacidad es requerido")
  //   .isLength({ min: 4, max: 30 }),
  body("descrip_discapa")
    .notEmpty()
    .withMessage("El campo Describir discapacidad es requerido")
    .isLength({ max: 100  })
    .withMessage("La descripcion maxima is de 200 caractateres"),
  body("height").notEmpty().withMessage("El campo Altura es requerido"),
  body("forma_rostro")
    .notEmpty()
    .withMessage("El campo Forma del rostro es requerido"),
  body("vestimenta").notEmpty().withMessage("El campo vestimenta es requerido"),
  body("time")
    .notEmpty()
    .withMessage("El campo Hora de desaparicion es requerido"),
  body("date_desa")
    .notEmpty()
    .withMessage("El campo fecha de desaparicion es requerido"),

  // body("coordenadas").notEmpty().withMessage("Por favor seleccione el lugar"),

  // body("image").isURL().withMessage("SUBA UNA IMAGEN"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("si")
    .isMongoId()
    .withMessage("xd"),
];
module.exports = validators;
