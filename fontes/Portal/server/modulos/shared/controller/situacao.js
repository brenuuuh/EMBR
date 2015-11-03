/**
 * Created by glauber on 06/01/15.
 */

var mongoose = require('mongoose');
var Model = mongoose.model('Situacao');

var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');


exports.read = function (req, res, next) {

    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
};

exports.add = function (req, res, next) {

    var params = req.body,
        item = new Model(params);

        item.dataInclusao = new Date();
        item.sequencial = null;

    baseCrud.saveAndRespond(item, req, res);

};

exports.update = function (req, res, next) {

    var params = req.body,
        id = req.params.id;

    baseCrud.updateAndRespond(Model,id,params, req, res);

};

exports.destroy = function (req, res, next) {

    var id = req.params.id;

    baseCrud.removeAndRespond(Model,id,res);

};
