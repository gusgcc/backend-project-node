const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadoSchema = new Schema ({

    idPostulante: String,
    idPublicacion: String,
    estado: {
        type: String,
        default: 'Trabajando'
    }

});

module.exports = mongoose.model('estado', estadoSchema);