const basedatos = require('../../database/connection');
const objectId = require('mongodb').ObjectId;

function buscarTodo(){
    let conexion = basedatos.obtenerConexion();

    /*
        TODO: Paginación
            skip() -> Omite x cantidad de documentos
            limit() -> Selecciona x cantidad de documentos.

            paginaActual
            cantidadDocumentoPorPaginas

            .skip((paginaActual-1) * cantidad).limit(cantidad)
    */

    return conexion.collection("peliculas").find({}).limit(50).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error); 
        })
}

function buscarPorId(id){
    let db = basedatos.obtenerConexion();
    
    return db.collection("peliculas").findOne({"_id": objectId(id)})
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

function buscarPorTitulo(titulo){
    let db = basedatos.obtenerConexion();
    
    return db.collection("peliculas").find({"titulo": new RegExp(titulo, "i") }).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

function crearUna(peliculaNueva){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").insertOne(peliculaNueva)
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

function actualizarUna(id,pelicula){
    let db= basedatos.obtenerConexion();

    return db.collection("peliculas").updateOne(
            {"_id":objectId(id)},
            {"$set":pelicula}
        )
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        })
}

function eliminarUna(id){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").deleteOne({"_id":objectId(id)})
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.buscarTodo = buscarTodo;
module.exports.buscarPorId = buscarPorId;
module.exports.buscarPorTitulo = buscarPorTitulo;
module.exports.crearUna = crearUna;
module.exports.actualizarUna = actualizarUna;
module.exports.eliminarUna = eliminarUna;