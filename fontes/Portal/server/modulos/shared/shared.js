//=================================================================================================
// Modulo Shared
// Contém recursos compartilhados por todos os outros módulos.
//=================================================================================================

var modelLoader = require('../../utils/modelLoader');

//Caminho referente ao modelLoader
var models = [
    '../modulos/shared/model/ibge',
    '../modulos/shared/model/atividade',
    '../modulos/shared/model/situacao'
];

exports.init = function(app){

    //carrega modelos
    modelLoader.load(models);

    app.use('/', require('./routes/index'));
    app.use('/ibge', require('./routes/ibge'));
    app.use('/atividade', require('./routes/atividade'));
    app.use('/interface', require('./routes/interface'));
    app.use('/situacao', require('./routes/situacao'));

};