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

module.exports = postulacionService;