const express = require('express');
const controladorPeliculas = express.Router();

/*
    GET -> OBTENER PELÍCULAS
    GET -> OBTENER PELÍCULA POR ID
    GET -> BUSCAR PELÍCULA POR TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCULAS
*/

controladorPeliculas.get("/obtenerPeliculas", function(req, res){
    res.send("Listar películas...");
});

module.exports = controladorPeliculas;