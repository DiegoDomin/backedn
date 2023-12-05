const Disapper = require("../models/disapper.model");
const controller = {};
const httpError = require("http-errors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
controller.create = async (req, res, next) => {
  //la peticion, la respuesta y la siguiente funcion
  try {

    //se inicializan los campos
    const {
      name,
      last_name,
      fecha_nacimiento,
      gender,
      color_ca,
      tez,
      color_ey,
      discapacidad,
      descrip_discapa,
      height,
      forma_rostro,
      vestimenta,
      time,
      date_desa,
      coordenadas,
      condicion,
      image,
    } = req.body;

    // se le asignan los campos respectivos creando asi un nuevo objeto 
    const disapper = new Disapper({
      name: name,
      last_name: last_name,
      fecha_nacimiento: fecha_nacimiento,
      gender: gender,
      condicion: condicion,
      color_ca: color_ca,
      tez: tez,
      color_ey: color_ey,
      discapacidad: discapacidad,
      descrip_discapa: descrip_discapa,
      height: height,
      forma_rostro: forma_rostro,
      vestimenta: vestimenta,
      time: time,
      date_desa: date_desa,
      coordenadas: coordenadas,
      image: image,
    });

// se guarda los datos
    const disapperSave = await disapper.save();

    // se hace la validacion de que si hay un error de que no se guarde muestre una al
    if (!disapperSave) {
      throw httpError(500, "No se ha podido guardar el formulario");
    }
    res.status(200).json({ data: disapperSave });
  } catch (error) {
    next(error);
  }
};

//que me traigan todos xd
controller.findAll = async (req, res, next) => {
  try {
    const DisapperFindAll = await Disapper.find({ hidden: false }); //arreglo
    return res.status(200).json({ data: DisapperFindAll });
  } catch (error) {
    next(error);
  }
};

//uno solo

controller.findOneById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const disappersFindOneById = await Disapper.findById(identifier);

    if (!disappersFindOneById) {
      throw httpError(500, "No se ha podido traer los formularios");
    }
    return res.status(200).json({ data: disappersFindOneById });
  } catch (error) {
    next(error);
  }
};

controller.deleteById = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const disapperDeleteById = await Disapper.findByIdAndDelete(identifier);

    if (!disapperDeleteById) {
      throw httpError(500, "No se ha podido eliminar los formularios");
    }

    return res
      .status(200)
      .json({ message: "se ha eliminado correctamente el formulario" });
  } catch (error) {
    next(error);
  }
};

controller.editForm = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const {
      name,
      last_name,
      fecha_nacimiento,
      gender,
      color_ca,
      tez,
      color_ey,
      discapacidad,
      descrip_discapa,
      height,
      forma_rostro,
      vestimenta,
      time,
      date_desa,
      coordenadas,
      condicion,
      image,
    } = req.body;

    let disapper = await Disapper.findById(identifier);
    if (!disapper) {
      disapper = new Disapper();
    }

    //si esxistes accede y lo sustituye
    disapper["name"] = name;
    disapper["last_name"] = last_name;
    disapper["fecha_nacimiento"] = fecha_nacimiento;

    disapper["gender"] = gender;
    disapper["color_ca"] = color_ca;

    disapper["tez"] = tez;
    disapper["color_ey"] = color_ey;

    disapper["discapacidad"] = discapacidad;
    disapper["descrip_discapa"] = descrip_discapa;

    disapper["height"] = height;
    disapper["forma_rostro"] =forma_rostro;

    disapper["vestimenta"] = vestimenta;
    disapper["time"] =time;

    disapper["date_desa"] = date_desa;
    disapper["coordenadas"] =coordenadas;

    disapper["condicion"] = condicion;
    disapper["image"] =image;


    const disapperSave = await disapper.save();
    if (!disapperSave) {
      throw httpError(500, "No se ha podido guardar el formulario");
    }
    res.status(201).json({ data: disapperSave });
  } catch (error) {
    next(error);
  }

}

controller.getPDF = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Obtén los datos necesarios para el PDF según el identificador
    const disapperData = await Disapper.findById(identifier);

    if (!disapperData) {
      throw httpError(404, "No se encontró el formulario");
    }

    const doc = new PDFDocument();

    // Configura el encabezado para la descarga del PDF
    res.setHeader('Content-disposition', `attachment; filename=${disapperData.name}_form.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF a la respuesta (stream)
    doc.pipe(res);

    // Agrega contenido al PDF según tus necesidades

    doc.text(`Nombres: ${disapperData.name}`);
    doc.text(`Apellidos: ${disapperData.last_name}`);
    doc.text(`Fecha de nacimiento: ${disapperData.fecha_nacimiento}`);
    doc.text(`Color de cabello:  ${disapperData.color_ca}`);
    doc.text(`Tez: ${disapperData.tez}`);
    doc.text(`Color de ojos: ${disapperData.color_ey}`);
    doc.text(`Forma del rostro: ${disapperData.forma_rostro}`);
    doc.text(`Discapacidad: ${disapperData.descrip_discapa}`);
    doc.text(`vestimenta: ${disapperData.vestimenta}`);
    doc.text(`hora que fue visto por ultima vez: ${disapperData.time}`);

    doc.text(`Fecha de desaparicon: ${disapperData.date_desa}`);
    doc.text(`ultimo lugar donde fue visto: ${disapperData.coordenadas}`);








    // Agrega más campos según sea necesario

    // Finaliza el documento PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message });
      }
};




module.exports = controller;
