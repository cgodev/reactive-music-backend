const { Schema, model } = require('mongoose');

const UserCredentialSchema = Schema({

    public_key: {
        type: String,
        required: true,
    },
    private_key: {
        type: String
    },
    /* Establecer una referencia entre 2 documentos */
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { collection: 'user_credentials' });

/* Modificar nombres y propiedades del objeto que se devuelve */

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('UserCredential', UserCredentialSchema);