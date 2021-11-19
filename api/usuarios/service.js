const bcrypt = require('bcrypt'); 
require('dotenv').config();
const modeloUsuarios = require('./model');
const crearToken = require('../auth/jwt').crearToken;

async function crearUsuario(datosUsuario){
    let resultado = {};
    if(datosUsuario && Object.keys(datosUsuario).length > 0 && datosUsuario.usuario && datosUsuario.clave){
        let claveEncriptada = bcrypt.hashSync(datosUsuario.clave, parseInt(process.env.ENC_SALT_ROUNDS));
        datosUsuario.clave = claveEncriptada;
        
        let resultadoCrear = await modeloUsuarios.crearUno(datosUsuario);

        if(resultadoCrear && resultadoCrear.acknowledged){
            resultado.mensaje = "Usuario creado correctamente";
            resultado.datos = datosUsuario;
        }
        else{
            resultado.mensaje = "No se pudo crear el usuario";
            resultado.datos = datosUsuario;
        }
    }
    else{
        resultado.mensaje = "Datos inválidos";
        resultado.datos = datosUsuario;
    }
    
    return resultado;
}

async function iniciarSesion(usuario){
    let resultado = {};
    if(usuario && Object.keys(usuario).length > 0 && usuario.usuario && usuario.clave){
        let resultadoUsuario = await modeloUsuarios.buscarPorUsuario(usuario.usuario);
        if(resultadoUsuario){
            let claveEncriptada = resultadoUsuario.clave;
            let esValida = bcrypt.compareSync(usuario.clave, claveEncriptada);
            if(esValida){
                resultado.mensaje = "Inicio de sesión correcto";
                const token = crearToken(resultadoUsuario);
                delete resultadoUsuario.clave;
                resultado.datos = resultadoUsuario;
                resultado.token = token;
            }
            else{
                resultado.mensaje = "Contraseña inválida";
                resultado.datos = usuario;
            }
        }
        else{
            resultado.mensaje = "El usuario no existe";
            resultado.datos = usuario;
        }
    }
    else{
        resultado.mensaje = "Datos inválidos";
        resultado.datos = datosUsuario;
    }

    return resultado;
}

module.exports.crearUsuario = crearUsuario;
module.exports.iniciarSesion = iniciarSesion;