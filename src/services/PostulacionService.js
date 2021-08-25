const postulacionService = {}
var mongoose = require('mongoose')
const Postulacion = require("../models/modelosBD/Postulacion")
const PublicacionService= require("../services/PublicacionService")
const UserService = require("../services/UserService")

postulacionService.crearPostulacion = async (crearPostulacionModel) => {
    const newPostulacion = new Postulacion({
        idPostulante: crearPostulacionModel.idPostulante,
        idPublicacion: crearPostulacionModel.idPublicacion,
        rangoSalarial: crearPostulacionModel.rangoSalarial,
        comentario: crearPostulacionModel.comentario,
        disponibilidad: crearPostulacionModel.disponibilidad,
        idEmpleado: crearPostulacionModel.idEmpleado
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

postulacionService.traerPostulantes = async (idPublicacion) => {
    try {
            let postulaciones = await Postulacion.find({idPublicacion: idPublicacion}).populate('idEmpleado', {password: 0, tipo: 0, _id: 0});
            //console.log(postulaciones[0].rangoSalarial);
            return postulaciones;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = postulacionService;