const Mongose = require('mongoose');
const debug = require('debug')("app:database");
const envconfig = require('./env.config')

const uri = envconfig.MONGO_URI;


const connect = async () => {
    try{
        await Mongose.connect(uri); //la uri que hicimos anteriormente
        debug("Connection to database started");

    } catch(error){
        console.error(error);
        debug("Cannot connect to database");
        process.exit(1); //terminamos el proceso
    }

}


/*
    desconeccion a la base de datos 
*/

const disconnect = async () => {
    try{
        await Mongose.disconnect(uri); //la uri que hicimos anteriormente
        debug("Connection to database end");

    } catch(error){
        debug("Desconnection to database end");

        process.exit(1); //terminamos el proceso
    }

}

//exponerlos 

module.exports = {
    connect,
    disconnect
}