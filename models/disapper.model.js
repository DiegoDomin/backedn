//ADMIN

const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

//Vamos a definir el esquema para llevar un flujo
const Schema = Mongoose.Schema;
const DisapperSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    /*des_general: {
        type: String,
    },*/
    last_name: {
      type: String,
      required: true,
    },

    fecha_nacimiento: {
      type: String,
      required: true,
      edadDesconocida: { type: Boolean, default: false },
    },

    gender: {
      type: String,
      required: true,
    },

 
    color_ca: {
      type: String,
      required: true,
    },
    tez: {
      type: String,
      required: true,
    },
    color_ey: {
      type: String,
      required: true,
    },

    discapacidad: {
      type: String,
      lowercase: true, //funciona para cadenas
      required: true,
    },
    descrip_discapa: {
      type: String,
      required: true,
    },
    condicion:{
        type:String,
        required:true
    }
,
    height: {
        type: String ,
        required:true
      
        },
    forma_rostro: {
      type: String,
      required: true,
    },
    discapacidad: {
      type: String,
      lowercase: true, //funciona para cadenas
      required: true,
    },
    descrip_discapa: {
      type: String,
      required: true,
    },

    vestimenta: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      momentoDesconocido: { type: Boolean, default: false },
    },

    date_desa: {
      type: String,
      required: true,
    },
    coordenadas: {
      lon: {
        type: Number,
        min: -200.000001,
        max: 90,
      },
      lat: {
        type: Number,
        min: -200.000001,
        max: 90,
      },
    },
    image: {
      //URL de la img
      type: String,
    },

    hidden: {
      type: Boolean,
      default: false,
    }, //ocultar publicacion
  },
  { timestamps: true }
); //creado y actualizado, lo usara admin y usuario

const Disapper = Mongoose.model("Disapper", DisapperSchema);
module.exports = Disapper;
