const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postulacionSchema = new Schema ({

    idPostulante: String,
    idPublicacion: String,
    rangoSalarial: String,
    comentario: String,
    disponibilidad: String
    /* idEmpleador: {
        type: mongoose.Types.ObjectId
    } */

});

module.exports = mongoose.model('postulacion', postulacionSchema);