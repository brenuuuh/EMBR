/**
 * Created by glauber on 06/01/15.
 */

var mongoose = require('mongoose');
var Model = mongoose.model('Perfil');

var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');
var email = require('../../../utils/email');
exports.enviarAlteracoes = function (req, res) {
    var dados = req.body;

    var emailOptionsDep1 = {
        from: 'portal@avancoinfo.com.br',
        to: 'adm@avancoinfo.com.br',
        //to: 'lorena.ziviani@avancoinfo.com.br',
        subject: 'Alterações cliente - PORTAL.',
        text: 'Alterações: ' + dados.alteracao

    };
    email.sendMail(emailOptionsDep1);

    res.senchaSubmitRes(true, 'Enviando email para o departamento!');

};

exports.enviarFaleConosco = function (req, res) {

    var dados = req.body;

    if (dados.evento == 1) {


        var emailOptionsDep1 = {
            from: 'brenuhfigueiredo@gmail.com',
            to: 'breno.ads@hotmail.com',
            //to: 'lorena.ziviani@avancoinfo.com.br',
            subject: 'Fale Conosco - EMBR.',
            text: 'Tipo: ' + dados.tipo + '\n Assunto: ' + dados.assunto + '\n Mensagem: ' + dados.mensagem

        };
        email.sendMail(emailOptionsDep1);

        res.senchaSubmitRes(true, 'Enviando email para o administrador do evento!');

    } else if (dados.evento == 2) {
        var emailOptionsDep2 = {
            from: 'brenuhfigueiredo@gmail.com',
            to: 'breno.ads@hotmail.com',
            //to: 'lorena.ziviani@avancoinfo.com.br',
            subject: 'Fale Conosco - EMBR.',
            text: 'Tipo: ' + dados.tipo + '\n Assunto: ' + dados.assunto + '\n Mensagem: ' + dados.mensagem

        };
        email.sendMail(emailOptionsDep2);

        res.senchaSubmitRes(true, 'Enviando email para o administrador do evento!');
    //
    //}
    //else if (dados.departamento == 3) {
    //    var emailOptionsDep3 = {
    //        from: 'portal@avancoinfo.com.br',
    //        to: 'suporte@avancoinfo.com.br',
    //        //to: 'lorena.ziviani@avancoinfo.com.br',
    //        subject: 'Fale Conosco - PORTAL.',
    //        text: 'Nome: ' + dados.nome + '\n Telefone: ' + dados.telefone + '\n Mensagem: ' + dados.mensagem
    //
    //    };
    //    email.sendMail(emailOptionsDep3);
    //
    //    res.senchaSubmitRes(true, 'Enviando email para o departamento!');
    //
    //} else if (dados.departamento == 4) {
    //    var emailOptionsDep4 = {
    //        from: 'portal@avancoinfo.com.br',
    //        to: 'iuri@avancoinfo.com.br',
    //        //to: 'lorena.ziviani@avancoinfo.com.br',
    //        subject: 'Fale Conosco - PORTAL.',
    //        text: 'Nome: ' + dados.nome + '\n Telefone: ' + dados.telefone + '\n Mensagem: ' + dados.mensagem
    //
    //    };
    //
    //    email.sendMail(emailOptionsDep4);
    //
    //    res.senchaSubmitRes(true, 'Enviando email para o departamento!');
    //}
    //else if (dados.departamento == 5) {
    //    var emailOptionsDep5 = {
    //        from: 'portal@avancoinfo.com.br',
    //        to: 'tecnologia@avancoinfo.com.br',
    //        // to: 'lorena.ziviani@avancoinfo.com.br',
    //        subject: 'Fale Conosco - PORTAL.',
    //        text: 'Nome: ' + dados.nome + '\n Telefone: ' + dados.telefone + '\n Mensagem: ' + dados.mensagem
    //
    //    };
    //
    //    email.sendMail(emailOptionsDep5);
    //
    //    res.senchaSubmitRes(true, 'Enviando email para o departamento!');
    }


};
//exports.read = function (req, res) {
//
//    if (req.query.combo) {
//        exports.combo(req, res);
//        return;
//    }
//
//    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
//};
//
//exports.add = function (req, res) {
//
//    var params = req.body,
//        item = new Model(params);
//
//    item.dataInclusao = new Date();
//    item.sequencial = null;
//
//    baseCrud.saveAndRespond(item, req, res);
//
//};
//
//exports.update = function (req, res) {
//
//    var params = req.body,
//        id = req.params.id;
//
//    baseCrud.updateAndRespond(Model, id, params, req, res);
//
//};
//
//exports.destroy = function (req, res) {
//
//    var id = req.params.id;
//
//    baseCrud.removeAndRespond(Model, id, res);
//
//};
//
//exports.combo = function (req, res) {
//
//    Model.find({}, '_id perfil', function (err, results) {
//        res.senchaRes(true, results);
//    });
//
//};