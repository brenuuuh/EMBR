//=================================================================================================
// Modulo Usuario
// Controla o usuario e seus perfis.
//=================================================================================================

var modelLoader = require('../../utils/modelLoader');
var auth = require('../../security/auth');

//Caminho referente ao modelLoader
var models = [
    '../modulos/usuario/model/usuario',
    '../modulos/usuario/model/perfil'
];

exports.init = function(app){

    //carrega modelos
    modelLoader.load(models);

    //Inicia autenticacao
    auth.init(app);

    //carrega rotas
    var user = require('./routes/usuario');
    app.use('/usuario', user);
    var perfil = require('./routes/perfil');
    app.use('/perfil', perfil);




};

