/* ctrl = {}

const estadoService = require("../services/EstadoService")

ctrl.crearEstado = async (req, res) => {
    //let respuesta = new RespuestaModel();

    try{
        if(await estadoService.crearEstado(req.body)){
           // respuesta.mensaje = "Postulacion almacenada Correctamente"
           // respuesta.status = 200
            console.log(req.body)
            res.status(200).json({mensaje: "Se registro el estado"})
        }else{
            res.status(500).json({ mensaje: "Ocurrio un error en el servidor" })
        }

    }catch(error){
        console.log(error)
    }
    //res.status(respuesta.status).json(respuesta);//respondemos
}

module.exports = ctrl; */