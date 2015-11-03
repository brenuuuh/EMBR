var mongoose = require('mongoose');
var Model = mongoose.model('Ibge');
var baseCrud = require('../../../utils/baseCrud');

exports.read = function (req, res, next) {

    if(req.query.estados){
        exports.comboEstado(req, res, next);
        return;
    }

    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
};

exports.add = function (req, res) {

    var params = req.body,
        item = new Model(params);

    baseCrud.saveAndRespond(item, req, res);

};

exports.update = function (req, res) {

    var params = req.body,
        id = req.params.id;

    baseCrud.updateAndRespond(Model,id,params, req, res);

};

exports.destroy = function (req, res) {

    var id = req.params.id;

    baseCrud.removeAndRespond(Model,id,res);

};

exports.comboEstado = function(req, res, next) {
    baseCrud.basicResponse(Model.find().distinct('uf'), req, res,
        //Tranforma o array da query em um obj JS para facilitar no sencha
        function (records) {
            return records.sort().map(function (record) {
                return {'id': record, 'desc': record}
            });

        });
};