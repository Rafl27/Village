const mongoose = require('mongoose');
const reservaSchema = mongoose.Schema({ 
    data : {
        type : String,
        required : true
    },
    nome : {
        type : String,
        required : true
    },
    area: {
        type : String,
        required : true
    },
    numeroDePessoas : {
        type : String,
        required : true
    },
    email : {   
        type : String,
        required : true
    }
});

module.exports = mongoose.model('reservaExport', reservaSchema);
// Posts PostSchema