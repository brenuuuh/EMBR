var mongoose  = require('mongoose');
var Model     = mongoose.model('Pessoa');
var _         = require('underscore');
var baseCrud  = require('../../../utils/baseCrud');
var AES       = require('../../../utils/AES')
exports.read = function (req, res) {

    if(req.query.combo){
        exports.combo(req, res);
        return;
    }

    var query = Model.find();

    if(req.query.tipo)
        query.where('tipoEntidade').equals(req.query.tipo);

    baseCrud.readAndRespond(query, Model.find(), req, res);
};

exports.add = function (req, res) {

    var params = req.body,
        item = new Model(params);

    item.dataInclusao = new Date();
    item.sequencial = null;

    //Ja grava como empresa e filila se for cadastro de empresa
    if(item.tipoEntidade[0] === 'empresa'){
        item.tipoEntidade.push('filial');
    }

    baseCrud.saveAndRespond(item, req, res);

};

exports.update = function (req, res) {

    var params = req.body,
        id = req.params.id;

    //Quebra o parametro enviado pelo sencha
    if(Array.isArray(params.tipoEntidade)){
        params.tipoEntidade = params.tipoEntidade[0].split(',');
    }else{
        params.tipoEntidade = params.tipoEntidade.split(',');
    }

    baseCrud.updateAndRespond(Model,id,params, req, res);

};

exports.destroy = function (req, res) {

    var id = req.params.id;

    baseCrud.removeAndRespond(Model,id,res);

};

exports.combo = function (req, res) {

    Model.getCombo(req.query.tipo, req.user.empresa, function (err, results) {
        res.senchaRes(true, results);
    });
};

exports.apikey = function (req, res) {
    Model.getFilialById(req.query.filial, req.user.empresa, function (err, filial) {
        res.senchaRes(true, AES.encrypt(filial.empresa + "|" + filial._id ));
    });
};

exports.decrypt = function (req, res) {
    res.senchaRes(true, AES.decrypt(req.query.key));
};