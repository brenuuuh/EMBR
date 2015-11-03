/**
 * Created by breno on 28/10/15.
 */
//=================================================================================================
// Modulo Eventos
// Controla o usuario e seus perfis.
//=================================================================================================

var modelLoader = require('../../utils/modelLoader');
var auth = require('../../security/auth');

//Caminho referente ao modelLoader
var models = [
    '../modulos/eventos/model/eventos'
];

exports.init = function(app){

    //carrega modelos
    modelLoader.load(models);

    //Inicia autenticacao
    auth.init(app);

    //carrega rotas
    var evento = require('./routes/eventos');
    app.use('/eventos', evento);




};

