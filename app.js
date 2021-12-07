/* 
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
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
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));

/* 
    INICIAR RUTAS/CONTROLADORES
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/*
    CONFIGURAR LA CARPETA PÚBLICA
*/
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+"./index.html"));
});

basedatos.conectar()
    .then(function(){
        app.listen(puerto,function(){
            console.log("API Ejecutándose en el puerto " + puerto);
        });
    })
    .catch(function(error){
        console.log(error);
    });