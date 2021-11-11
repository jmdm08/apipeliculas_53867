/* 
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');

/*
    INICIAR EXPRESS
*/
const app = express();

/* 
    INICIAR LA CONFIGURACIÓN
*/
const puerto = 3200;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* 
    INICIAR RUTAS/CONTROLADORES
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

app.listen(puerto,function(){
    console.log("API Ejecutándose en el puerto " + puerto);
});