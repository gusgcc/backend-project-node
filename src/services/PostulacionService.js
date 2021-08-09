const postulacionService = {}
var mongoose = require('mongoose')
const Postulacion = require("../models/modelosBD/Postulacion")

postulacionService.crearPostulacion = async (crearPostulacionModel) => {
    const newPostulacion = new Postulacion({
        idPostulante: crearPostulacionModel.idPostulante,
        idPublicacion: crearPostulacionModel.idPublicacion,
        rangoSalarial: crearPostulacionModel.rangoSalarial,
        comentario: crearPostulacionModel.comentario,
        disponibilidad: crearPostulacionModel.disponibilidad
    })

    await newPostulacion.save();
    return true;
}

postulacionService.traerPostulaciones= async(idPostulante)=>{
    try {
        let postulaciones = await Postulacion.find({idPostulante:idPostulante});
        let idPublicaciones=[];
        //console.log(postulaciones);
        for (i in postulaciones){
            idPublicaciones.push(postulaciones[i].idPublicacion);
            console.log(postulaciones[i].idPublicacion);
        }
        
        //return postulaciones;
        return idPublicaciones;
    } catch (error) {
        console.log(error);
        return null ;
    }
}


module.exports = postulacionService;