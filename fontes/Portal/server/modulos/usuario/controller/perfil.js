/**
 * Created by breno.
 */

var mongoose = require('mongoose');
var Model = mongoose.model('Perfil');

var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');
var email = require('../../../utils/email');

exports.enviarFaleConosco = function (req, res) {

    var dados = req.body;

    var user = req.user;

    if (dados.tipo == 1) {


        var emailOptionsDep1 = {
            from: user.email,
            to: 'administrativo@embr-bh.xyz',
            subject: 'Fale Conosco - EMBR.',
            text: 'Tipo: ' + dados.tipo + '\n Assunto: ' + dados.assunto + '\n Mensagem: ' + dados.mensagem

        };
        email.sendMail(emailOptionsDep1);

        res.senchaSubmitRes(true, 'Enviando email para o administrador do evento!');

    } else if (dados.tipo == 2) {
        var emailOptionsDep2 = {
            from: user.email,
            to: 'administrativo@embr-bh.xyz',
            subject: 'Fale Conosco - EMBR.',
            text: 'Tipo: ' + dados.tipo + '\n Assunto: ' + dados.assunto + '\n Mensagem: ' + dados.mensagem

        };
        email.sendMail(emailOptionsDep2);

        res.senchaSubmitRes(true, 'Enviando email para o administrador do evento!');
    }


};