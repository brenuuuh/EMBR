/**
 * Created by breno on 28/10/15.
 */
//=================================================================================================
//Entidade - Eventos
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({

        nome: {type: String, required: true},

        descricao: {type: String, required: true},

        tipo: {type: String, required: true, default: 'Gratuito'},

        faixa: {type: String, required: true, default: 'Livre'},

        status: {type: String, required: true, default: 'Confirmado'},

        dataEvento: {type: Date, required: true},

        horaEvento: {type: String, required: true},

        cidade: {type: String, required: true},

        estado: {type: String, required: true},

        local: {type: String, required: true}

    });

    return mongoose.model("Evento", Model);

};



