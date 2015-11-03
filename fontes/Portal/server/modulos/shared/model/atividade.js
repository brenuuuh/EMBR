/**
 * Created by glauber on 06/01/15.
 */

//=================================================================================================
//Entidade - Atividade
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");
var commons       = require('../../../utils/commons');

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({


        sequencial: {type: Number},

        empresa: {type: Schema.Types.ObjectId, ref: 'Pessoa', required: true},

        atividade: {type: String, required: true},

        dataInclusao: {type: Date},
        dataAlteracao: {type: Date},

        usuInclusao: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        usuAlteracao: {type: Schema.Types.ObjectId, ref: 'Usuario'}
    });

    //auto increment
    Model.plugin(autoIncrement.plugin, { model: 'Atividade', field: 'sequencial',  startAt: 1 });

    return mongoose.model("Atividade", Model);
};



