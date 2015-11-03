//=================================================================================================
// Modulo Pessoa
// Cadastro de Pessoas
//=================================================================================================

var modelLoader = require('../../utils/modelLoader');

//Caminho referente ao modelLoader
var models = [
    '../modulos/pessoa/model/pessoa'
];

exports.init = function(app){

    //carrega modelos
    modelLoader.load(models);

    //carrega rotas
    var pessoa = require('./routes/pessoa');
    app.use('/pessoa', pessoa);

};

