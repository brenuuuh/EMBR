/**
 * Created by breno on 28/10/15.
 */
//=================================================================================================
//Entidade - Eventos
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");
//var commons       = require('../../../utils/commons');


module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({

        nome: {type: String, required: true},

        descricao: {type: String, required: true},

        tipo: {type: String, required: true, default: 'Gratuito'},

        faixa: {type: String, required: true, default: 'Livre'},

        status: {type: Boolean},

        dataEvento: {type: Date},

        horaEvento: {type: String}

    });

    return mongoose.model("Evento", Model);

};



