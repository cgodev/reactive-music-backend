const { Schema, model } = require('mongoose');

const UserCredentialSchema = Schema({

    client_id: {
        type: String,
        required: true,
    },
    client_secret: {
        type: String,
        required: true
    },
    /* Establecer una referencia entre 2 documentos */
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { collection: 'user_credentials' });

/* Modificar nombres y propiedades del objeto que se devuelve */

UserCredentialSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('UserCredential', UserCredentialSchema);