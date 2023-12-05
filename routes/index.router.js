const express = require("express");
const router = express.Router(); //enrutador 
const disapperRouter = require ("./disapper.router");
const createUSer= require("./autenticacion.router");

router.use("/disapp", disapperRouter);
// /apu/auth/registrarse    
router.use("/auth",createUSer);

module.exports = router;