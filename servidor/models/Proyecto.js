const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        creador: {
            type: mongoose.Schema.Types.ObjectId, //tiene referencia a un id que se encuentra en la tabla de Usuarios, y lo encuentra por medio del ref: 'Usuario'
            ref: 'Usuario'
        },

        creado: {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model('Proyecto', ProyectoSchema)