const express = require('express');
const controladorUsuarios = express.Router();

/*
    POST -> LOGIN
    GET -> OBTENER EL USUARIO POR EL ID
*/

controladorUsuarios.get("/obtenerUsuario/:id", function(req, res){
    let id = req.params.id;
    res.send("El id del usuario es " + id);
});

module.exports = controladorUsuarios;