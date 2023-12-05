const express = require("express");
const router = express.Router(); //enrutador 

const autController = require("../controllers/autenticar.controller");
const {registrarUsuario} = require("../validators/autenticacion.validator");
const runValidate = require("../middlewares/index.middlewares");
const {authentication}=require("../middlewares/autorizacion.middlewares")

router.post("/registrarse",registrarUsuario, runValidate, autController.register);
router.post("/login",autController.login)
router.post("/logout",autController.logout)

router.post("/profile",authentication)
module.exports = router;
