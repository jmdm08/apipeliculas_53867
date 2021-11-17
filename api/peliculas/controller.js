const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service'); 

/*
    GET -> OBTENER PELÍCULAS - OK
    GET -> OBTENER PELÍCULA POR ID 
    GET -> BUSCAR PELÍCULA POR TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCULAS
*/

/**
 * BUSCAR TODAS LAS PELÍCULAS
 */
controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje" : "Listado de películas",
        "data" : peliculas
    });
});

/**
 * BUSCAR UNA PELÍCULA POR ID
 */
controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Detalle película",
        "data" : pelicula
    });
})

/**
 * Obtener películas por el Título
 */
controladorPeliculas.get("/buscarPeliculasTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(titulo);
    res.send({
        "mensaje": "Resultado búsqueda",
        "busqueda":titulo,
        "data": peliculas
    });
})

/* 
    3 FORMAS PARA CAPUTRAR LA INFORMACIÓN DE UNA PETICIÓN.
        -> PARÁMETROS. -> GET/POST/PUT/DELETE
        -> QUERY STRING -> ?clave=valor&clave=valor /GET/POST/PUT/DELETE
        -> CUERPO (BODY.) -> POST/PUT
            -> JSON
                {
                    "titulo" : xxx,
                    "ano": 1,
                    "generos": ["A", "B"]
                }
*/

controladorPeliculas.post("/crearPelicula", async function(req, res){
    let peliculaNueva = req.body;
    let respuesta = await servicioPeliculas.crearPelicula(peliculaNueva);
    res.send(respuesta);
});

/*
    http://localhost:3200/api/peliculas/actualizarPelicula/sdslkj99292
        {
            "titulo": "nuevoTitulo",
            "ano": nuevoAno 
        }
*/

controladorPeliculas.put("/actualizarPelicula/:id", async function (req,res){
    let id = req.params.id;
    let pelicula = req.body;
    let respuesta = await servicioPeliculas.actualizarPelicula(id,pelicula);
    res.send(respuesta);
})

module.exports = controladorPeliculas;