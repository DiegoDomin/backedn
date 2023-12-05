//RUTA PARA FORMULARIO DESAPARECIDO

const express = require("express");
const router = express.Router(); //enrutador
const { createFormValidator,idInParamsValidator } = require("../validators/form.validator");
const validateForm = require("../middlewares/index.middlewares");

const disapperController = require("../controllers/disapper.controller");



// router.get("/", disapperController.findAll);
router.post("/",createFormValidator, validateForm, disapperController.create);

//editar formulari
router.put("/:identifier",createFormValidator,validateForm,disapperController.editForm);
//sustitiible de lo que el usuario coloque
router.get("/:identifier", disapperController.findOneById);
//
router.get("/",disapperController.findAll);
router.get("/pdf/:identifier",disapperController.getPDF);

/////


///
router.delete("/:identifier", validateForm,idInParamsValidator, disapperController.deleteById);
module.exports = router;
