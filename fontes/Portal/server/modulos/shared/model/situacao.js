/**
 * Created by glauber on 06/01/15.
 */

//=================================================================================================
    //Entidade - Situacao de pessoas
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");
var commons       = require('../../../utils/commons');

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({


        sequencial: {type: Number},

        empresa: {type: Schema.Types.ObjectId, ref: 'Pessoa', required: true},

        situacao: {type: String, required: true},
        // Identifica se ira bloquear...
        bloqueia: {type: Boolean, required: true},
        // Identifica se irá liberar o cliente para todos os bloqueios (limite cliente, limite convênio, cadastro incompleto etc..)
        // Irá alertar mas não irá bloquear a transação
        liberaBloqueios: {type: Boolean, required: true},
        //Identifica se irá destacar a pessoa
        destacar: {type: Boolean, required: true},

        dataInclusao: {type: Date, default: Date.now},
        dataAlteracao: {type: Date},

        usuInclusao: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        usuAlteracao: {type: Schema.Types.ObjectId, ref: 'Usuario'}
    });

    //auto increment
    Model.plugin(autoIncrement.plugin, { model: 'Situacao', field: 'sequencial',  startAt: 1 });

    return mongoose.model("Situacao", Model);
};



