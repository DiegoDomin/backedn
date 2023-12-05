//ADMIN

const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const SchemaUsers = Mongoose.Schema;
const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const UserSchema = SchemaUsers(
  {
    name_u: {
      type: String,
      required: true,
    },
    lastName_u: {
      type: String,
      required: true,
    },
    fechaNacimiento_u: {
      type: String,
      required: true,
    },
    dui_u: {
      type: String,
      required: true,
    },
    direccion_u: {
      type: String,
      required: true,
    },
    numero_tel_u: {
      type: String,
      required: true,
    },
    numero_tel_emer_u: {
      type: String,
      required: true,
    },
    genero_u: {
      type: String,
      required: true,
    },
    correo_u: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      //no tenga diferencia entre mayuscula y minuscula
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },

    //genere redundancia si se desencripta
    salt: {
      type: String,
    },

    //
    tokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    //en este try se ecnripta la contraseña
    try {
      //se necesita inmediatamente la contraseña
      const _password = crypto
        .pbkdf2Sync(
          //saca del documento de la salt
          password,
          this.salt,
          1000,
          64, //longitud de la llaves
          `sha512`
        )
        .toString("hex");

      return _password;
    } catch (error) {
      debug({ error });
      return "";
    }
  },
  //proceso aleatorio , usa generacion random mas avanzado
  makeSalt: function () {
    //cantidad de caracteres
    return crypto.randomBytes(16).toString("hex");
  },
  //se compara con la contraseña que se escriba con el encriptado
  comparePassword: function (password) {
    return this.hashedPassword === this.encryptPassword(password);
  },
};

//es temporal
UserSchema.virtual("password").set(function (
  password = crypto.randomBytes(16).toString()
) {
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

//Vamos a definir el esquema para llevar un flujo
const User = Mongoose.model("User", UserSchema);
module.exports = User;
