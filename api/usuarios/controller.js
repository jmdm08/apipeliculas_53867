const express = require('express');
const controladorUsuarios = express.Router();
const servicioUsuarios = require('./service');

/*
    GET -> LOGIN
    POST -> CREAR USUARIO
*/
/*
    usuario = {
        "nombre": "XXXXXX",
        "usuario": "xxxxxx", -> ENCRIPTAR CONTRASEÑA (BCRYPT)
        "clave": "xxxxxxx",
        "roles": ["A","B"]
    }
*/
/**
 * CREAR UN NUEVO USUARIO
 */
controladorUsuarios.post("/crearUsuario", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.crearUsuario(datosUsuario);
    res.send(resultado);
});

/**
 * INICIAR SESIÓN
 */
controladorUsuarios.get("/iniciarSesion", async function(req, res){
    let datos = req.query;
    let resultado = await servicioUsuarios.iniciarSesion(datos);
    res.send(resultado);
});

module.exports = controladorUsuarios;