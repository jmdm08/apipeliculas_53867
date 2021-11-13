const modeloPeliculas = require('./model');

async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.buscarTodo();
    return peliculas;    
}

async function obtenerPelicula(id){
    let pelicula = await modeloPeliculas.buscarPorId(id);
    /*
        OPERACIONES ADICIONALES....
    */
    return pelicula;
}

async function buscarPeliculasTitulo(titulo){
    let peliculas = await modeloPeliculas.buscarPorTitulo(titulo);
    return peliculas;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.buscarPeliculasTitulo = buscarPeliculasTitulo;