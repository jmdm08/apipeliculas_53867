/* 
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const basedatos = require('./database/connection');
require('dotenv').config();

/*
    INICIAR EXPRESS
*/
const app = express();

/* 
    INICIAR LA CONFIGURACIÓN
*/
const puerto = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));

/* 
    INICIAR RUTAS/CONTROLADORES
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

basedatos.conectar()
    .then(function(){
        app.listen(puerto,function(){
            console.log("API Ejecutándose en el puerto " + puerto);
        });
    })
    .catch(function(error){
        console.log(error);
    });