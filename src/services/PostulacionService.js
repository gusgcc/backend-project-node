const postulacionService = {}
var mongoose = require('mongoose')
const Postulacion = require("../models/modelosBD/Postulacion")
const PublicacionService= require("../services/PublicacionService")

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
        let publicaciones=[];
        //console.log(postulaciones);
        for (i in postulaciones){
            //console.log(postulaciones[i].idPublicacion);
            //idPublicaciones.push(postulaciones[i].idPublicacion);
            let publicacion=await PublicacionService.traerPublicacionId(postulaciones[i].idPublicacion);
            if(publicacion){
                publicaciones.push(publicacion)
            }
            console.log(publicacion);
        }
        
        //return postulaciones;
        return publicaciones;
    } catch (error) {
        console.log(error);
        return null ;
    }
}


module.exports = postulacionService;