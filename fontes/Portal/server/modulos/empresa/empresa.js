////=================================================================================================
//// Modulo Empresas
//// Cadastro de Empresas
////=================================================================================================
///**
// * Created by breno on 16/09/15.
// */
//var modelLoader = require('../../utils/modelLoader');
//var mongoose        = require('mongoose');
//var model = require('../empresa/model/empresa')(mongoose);
//var empresaCt = require('../empresa/controller/empresa');
//var CronJob         = require('cron').CronJob;
//
////Caminho referente ao modelLoader
//var models = [
//    '../modulos/empresa/model/empresa'
//];
//
//exports.init = function(app){
//
//    //carrega modelos
//    //modelLoader.load(models);
//
//    //carrega rotas
//    var empresa = require('./routes/empresa');
//    app.use('/empresa', empresa);
//
//    new CronJob('*/1 * * * *', function () {
//        empresaCt.buscaDadosGDA();
//    }, null, true, 'America/Sao_Paulo');
//
//};
//
//
