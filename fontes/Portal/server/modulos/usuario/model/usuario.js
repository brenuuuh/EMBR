//=================================================================================================
//Entidade - Usuário
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");
var commons       = require('../../../utils/commons');


module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({


        sequencial: {type: Number},

        email: {type: String, required: true},

        senha: {type: String, required: true},

        login: {type: String, required: true},

        admin: {type: Boolean},

        tipo: {type: String, default: 2},

        cpf: {type: String, required: true},

        nome: {type: String, required: true},

        dataNasc: {type: String, required: true},

        dataInclusao: {type: Date},

        dataAlteracao: {type: Date},

        logradouro: {type: String, required: true},

        numero: {type: String, required: true},

        cep: {type: String, required: true},

        complemento: {type: String},

        bairro: {type: String, required: true},

        estado: {type: String, required: true},

        cidade: {type: String, required: true}

    });

    Model.statics.login = function (login, senha, callback) {

        mongoose.model('Usuario').findOne({login: login}, function (err, user) {

                if (err) {
                    return callback(err);
                }

                if (user && user.senha === commons.toSha1(senha)) {

                    return callback(null, user);

                } else {

                    return callback(new Error('Credenciais incorretas.'));
                }

            });
    }

    //auto increment
    Model.plugin(autoIncrement.plugin, { model: 'Usuario', field: 'sequencial',  startAt: 1 });

    //Impede que a senha seja serializada
    Model.methods.toJSON = function() {
        var obj = this.toObject();
        delete obj.senha;
        return obj;
    };


    return mongoose.model("Usuario", Model);

};



