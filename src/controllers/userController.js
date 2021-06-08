ctrl = {}//controlador de rutas respecto a usuario
const UserService = require("../services/UserService")
//modelos de datos usados para trabajar. Estos modelos no se guardan directamente en bd
const RespuestaModel = require("../models/modelosTrabajo/RespuestaModel")

ctrl.login = async (req, res) => {
    let respuesta = new RespuestaModel()//modelo de respuesta
    try {
        respuesta.data = await UserService.generarToken(req.body)//devuelve un objeto con el token o sino false si hay error
        if (respuesta.data) {//si la respuesta es json o diferente de false
            respuesta.mensaje = "Inicio Sesion"
            respuesta.status = 200
        }
        else {
            respuesta.mensaje = "Correo o contraseña incorrecta"
            respuesta.status = 400
        }
    } catch (error) {
        respuesta.mensaje = "Error en servidor"
        respuesta.status = 500
    }
    res.status(respuesta.status).json(respuesta)
}
ctrl.register = async (req, res) => {
    let respuesta = new RespuestaModel();//modelo de respuesta
    try {
        if (await UserService.crearUsuario(req.body)) {//retorna true si se regsitra, false de lo contrario
            respuesta.mensaje = "Usuario Creado Correctamente"
            respuesta.status = 200
        }
        else {
            respuesta.mensaje = "El correo ya se encuentra en uso. Intente con otro"
            respuesta.status = 400
        }
    } catch (error) {
        console.log(error)
        respuesta.mensaje = "Ocurrio un error en el servidor"
        respuesta.status = 500
    }
    res.status(respuesta.status).json(respuesta);//respondemos
}
ctrl.perfil = async (req, res) => {//Devuele datos del perfil
    if (req.params.id.toString() == req.user.id) {//si coincide, es decir puede traer sus datos
        let data = await UserService.traerPerfil(req.user.id)
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ mensaje: "Ocurrio un error en el servidor" })
        }
    }
    else {
        res.status(400).json({ mensaje: "No tienes acceso " })
    }
}
ctrl.actualizar = async (req, res) => {//para actualizar los datos del usuario
    if (req.params.id.toString() == req.user.id) {//si coincide el id del token , con el parametro
            try {                              
                let resActualizar = await UserService.actualizar(req.body, req.user.id)
                if (resActualizar) {
                    res.status(200).json(resActualizar)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({ mensaje: "Ocurrio un erro en el servidor" })
            }
    }
    else {
        //el id del parametro no coincide con el del token
        res.status(401).json({ mensaje: "No tienes acceso" })
    }
}
module.exports = ctrl;