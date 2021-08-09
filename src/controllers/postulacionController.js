ctrl = {}

const postulacionService = require("../services/PostulacionService")
const RespuestaModel = require("../models/modelosBD/Postulacion")

ctrl.crearPostulacion = async (req, res) => {
    //let respuesta = new RespuestaModel();

    try{
        if(await postulacionService.crearPostulacion(req.body)){
           // respuesta.mensaje = "Postulacion almacenada Correctamente"
           // respuesta.status = 200
            console.log(req.body)
            res.status(200).json({mensaje: "Se registro la postulacion"})
        }else{
            res.status(500).json({ mensaje: "Ocurrio un error en el servidor" })
        }

    }catch(error){
        console.log(error)
    }
    //res.status(respuesta.status).json(respuesta);//respondemos
}

ctrl.verMisPostulaciones= async (req, res)=>{
    try{
        let misPostulaciones=await postulacionService.traerPostulaciones(req.params.idEmpleado)
        if(misPostulaciones){
            // respuesta.mensaje = "Postulacion almacenada Correctamente"
            // respuesta.status = 200
             console.log(req.body)
             res.status(200).json({data: misPostulaciones})
        }

    }catch(error){
        console.log(error);
    }
}

module.exports = ctrl;