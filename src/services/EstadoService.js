/* const estadoService = {}
var mongoose = require('mongoose')
const Estado = require("../models/modelosBD/Estado")

estadoService.crearEstado = async (crearEstadoModel) => {
    const newEstado = new Estado({
        idPostulante: crearEstadoModel.idPostulante,
        idPublicacion: crearEstadoModel.idPublicacion,
        estado: crearEstadoModel.estado
    })

    await newEstado.save();
    return true;
}

module.exports = estadoService; */