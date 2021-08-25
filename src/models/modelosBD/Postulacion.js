const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postulacionSchema = new Schema ({

    idPostulante: String,
    idPublicacion: String,
    rangoSalarial: String,
    comentario: String,
    disponibilidad: String,
    idEmpleado: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model('postulacion', postulacionSchema);