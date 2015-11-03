/**
 * Created by glauber on 06/01/15.
 */
//=================================================================================================
//Entidade - Perfil
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");
var commons       = require('../../../utils/commons');

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({


        sequencial: {type: Number},

        empresa: {type: Schema.Types.ObjectId, ref: 'Pessoa'},

        perfil: {type: String, required: true},

        administrador: {type: Boolean, required: true},

        dataInclusao: {type: Date},

        dataAlteracao: {type: Date}
    });

    //auto increment
    Model.plugin(autoIncrement.plugin, { model: 'Perfil', field: 'sequencial',  startAt: 1 });

    return mongoose.model("Perfil", Model);
};



