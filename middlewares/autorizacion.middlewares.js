const mongoose = require('mongoose');
const User = require("../models/user.model");
const debug = require("debug")("app:autorizacion-middleware");
const { verifyToken } = require("../utils/jwt.tools");
const ROLES = require("../data/roles.constants.json")
//Metodo/metodologia de como estan llegando las coasas, esto para verificar el token en insomnia 
const PREFIX ="Bearer";

const middlewares = {};
middlewares.authentication = async (req, res, next) => {

    try {
        //Sirve para verificar el usuario pero para eso está la última tarea

        const {authorization}=req.headers;
        if(!authorization){

            return res.status(401).json({ error: "User not autenticado, por cabecera" });
    }

      
        // //Validez del token
        const [prefix, token] = authorization.split(" ");

        if (prefix !== PREFIX) {
            return res.status(401).json({ error: "User not autenticado, por prefijo" });
        }

        if (!token) {
            return res.status(401).json({ error: "User not autenticado, no existe token" });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: "User not autenticado, por payload" });
        }



        const userId = payload["sub"];
 
        // //Verificar el usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: "User no encontrado" });
        }



        const isTokenValid=user.tokens.includes(token);

        if(!isTokenValid){
            return res.status(401).json({ error: "User no encontrado" });

        }

        
        req.user=user;
        req.token=token;
        // next();
    } catch (error) {
        console.log(error);
        return res.status(550).json({ error: "Internal Server Error" });
    }
}
middlewares.autenticacion = (roleRequired = ROLES.SYSADMIN)=>{
    return(req, res, next)=>{
        //Prueba de la verificacion del rol
        /*debug(roleRequired) 
        next();
        */
        
        //Modelo de usuario es necesario, por ende necesitamos una premisa
        //Premisa: debe de haber pasado por la autenticacion

        try {
            const { roles =[]} = req.user;

            //verificar si el rol requerido esta en la coleccion
            const isAuth = roles.includes(roleRequired);
            const isSysadmin = roles.includes(ROLES.SYSADMIN);
            
            //si no esta -> error 403
            if (!isAuth && !isSysadmin) {
                return res.status(403).json({error: "Forbidden"});
            }
            //si esta -> next
            next();
        } catch (error) {
            console.log(error);
        return res.status(550).json({error: "Internal Server Error"});
        }
    }
}

module.exports = middlewares;