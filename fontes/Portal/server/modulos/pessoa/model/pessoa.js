//=================================================================================================
//Entidade - Pessoa
//=================================================================================================

var autoIncrement = require("mongoose-auto-increment");

module.exports = function (mongoose) {

    var Schema = mongoose.Schema;
    var Model = new Schema({

        empresa: {type: Schema.Types.ObjectId, ref: 'Pessoa'},
        filial:{type: Schema.Types.ObjectId, ref: 'Pessoa'},

        sequencial: {type: Number},

        nome: {type: String, required: true},

        tipo: {type: String, enum: ["fisica", "juridica"], lowercase: true, trim: true},

        //"empresa", "filial", "contador", "cliente", "fornecedor"
        tipoEntidade: {type: [String], default: []},

        logradouro: {type: String, required: true},
        numero: {type: Number, required: true},
        complemento: {type: String},
        bairro: {type: String, required: true},
        cep: {type: String, required: true},
        cidade: {type: Schema.Types.ObjectId, ref: 'Ibge'},
        estado: {type: String, required: true},
        pais: {type: String, required: true},
        telefone: {type: String, required: true},
        celular: {type: String},
        comercial: {type: String},
        email: {type: String, required: true},

        //fisica
        cpf: {type: String},
        rg: {type: String},
        dataNasc: {type: String},
        pai: {type: String},
        mae: {type: String},

        //juridica
        cnpj: {type: String},
        fantasia: {type: String},
        ie: {type: String},
        im: {type: String},
        suframa: {type: String},


        //Contador
        contador: {type: Schema.Types.ObjectId, ref: 'Pessoa'},
        crc: {type: String},

        //filial
        checkouts: Number,
        area: Number,
        funcionarios: Number,
        verNfe: Number,
        regime: Number,

        contribuinteIpi: Boolean,
        contribuinteSt: Boolean,

        cofins: Number,

        dataInclusao: {type: Date},
        dataAlteracao: {type: Date},

        usuInclusao: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        usuAlteracao: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        // Operador
        codigoOperador: String,
        situacao: String

    });

    //=================================================================================================
    // Statics
    //=================================================================================================



    Model.statics.getByDocumento = function (sequencial, empresa, callback) {
        mongoose.model('Pessoa')
            .findOne()
            .or([{cpf: sequencial}, {sequencial: sequencial}, {cnpj: sequencial}])
            .where('empresa').equals(empresa)
            .populate('cidade')
            .exec(callback);
    };

    Model.statics.getBySequencial = function (sequencial, empresa, callback) {
        mongoose.model('Pessoa')
            .findOne([{sequencial: sequencial}])
            .where('empresa').equals(empresa)
            .populate('contador')
            .populate('cidade')
            .exec(callback);
    };


    Model.statics.getFilialById = function (filial, empresa, callback) {
        mongoose.model('Pessoa')
            .findOne([{_id: filial,  tipoEntidade: 'filial'}])
            .where('empresa').equals(empresa)
            .exec(callback);
    };

    Model.statics.getCombo = function (tipoEntidade, empresa, callback) {

        mongoose.model('Pessoa').find({tipoEntidade: tipoEntidade, empresa: empresa}, '_id nome', callback);

    };



    //=================================================================================================

    //auto increment
    Model.plugin(autoIncrement.plugin, { model: 'Pessoa', field: 'sequencial',  startAt: 1 });

    return mongoose.model('Pessoa', Model);
};
