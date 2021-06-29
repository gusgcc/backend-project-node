ctrl = {}//controlador de rutas respecto a usuario
const PublicacionService = require("../services/PublicacionService")
//modelos de datos usados para trabajar. Estos modelos no se guardan directamente en bd
const RespuestaModel = require("../models/modelosTrabajo/RespuestaModel")

/*ctrl.login = async (req, res) => {
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
}*/
ctrl.crearPublicacion = async (req,res) => {
    let respuesta = new RespuestaModel();//modelo de respuesta
    try {
        if (await PublicacionService.crearPublicacion(req.body,req.user.id)) {//retorna true si se regsitra, false de lo contrario
            respuesta.mensaje = "Publicacion Creada Correctamente"
            respuesta.status = 200
            console.log(req.body)
        }
        else {
            respuesta.mensaje = "Error en la publicacion"
            respuesta.status = 400
        }
    } catch (error) {
        console.log(error)
        respuesta.mensaje = "Ocurrio un error en el servidor"
        respuesta.status = 500
    }
    res.status(respuesta.status).json(respuesta);//respondemos
}
ctrl.mostrarPublicacion = async (req, res) => {//Devuele datos del perfil
    //si coincide, es decir puede traer sus datos
        let data = await PublicacionService.traerPublicacion(req.params.id)
       
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ mensaje: "Ocurrio un error en el servidor" })
        }
   
}
ctrl.mostrarPublicacionId = async (req, res) => {//Devuele datos del perfil
    //si coincide, es decir puede traer sus datos
        let data = await PublicacionService.traerPublicacionId(req.params.idPublicacion)
       
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ mensaje: "Ocurrio un error en el servidor" })
        }
   
}
ctrl.actualizar = async (req, res) => {//para actualizar los datos del usuario
    try {                              
        let resActualizar = await PublicacionService.actualizar(req.body)
        if (resActualizar) {
            res.status(200).json(resActualizar)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Ocurrio un erro en el servidor" })
    }
   
}
ctrl.eliminar = async (req, res) => {//para actualizar los datos del usuario
    try {                              
        let resActualizar = await PublicacionService.eliminar(req.params.id)
        if (resActualizar) {
            res.status(200).json({ mensaje: "Publicacion eliminada de forma correcta" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Ocurrio un erro en el servidor" })
    }
   
}

ctrl.listarPublicaciones = async (req, res) => { // listar las publicaciones para que las vean los empleados
    try {                              
        let listaPublicaciones = await PublicacionService.listarPublicaciones()
        res.status(200).json({data: listaPublicaciones})
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Ocurrio un erro en el servidor" })
    }
}

module.exports = ctrl;