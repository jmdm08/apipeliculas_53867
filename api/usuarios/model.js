const basedatos = require('../../database/connection');

async function crearUno(datosUsuario){
    let db = basedatos.obtenerConexion();
    return await db.collection("usuarios").insertOne(datosUsuario);
}

async function buscarPorUsuario(usuario){
    let db = basedatos.obtenerConexion();
    return await db.collection("usuarios").findOne({"usuario":usuario});
}

module.exports.crearUno = crearUno;
module.exports.buscarPorUsuario = buscarPorUsuario;