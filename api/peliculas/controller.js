const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service'); 

/*
    GET -> OBTENER PELÍCULAS
    GET -> OBTENER PELÍCULA POR ID
    GET -> BUSCAR PELÍCULA POR TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCULAS
*/

controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje" : "Listado de películas",
        "data" : peliculas
    });
});

module.exports = controladorPeliculas;