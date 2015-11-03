/**
 * Created by breno on 28/10/15.
 */
var mongoose = require('mongoose');
var Model = mongoose.model('Evento');
var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');
var generatePassword    = require('password-generator');
var processaEmail = require('../../../utils/email');
var conf = require('../../../../conf/conf');

exports.read = function (req, res) {

    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
};

exports.cadastrarEvento = function (req, res) {

    var params = req.body;

    Model.findOne({nome: params.nome},function (err, result) {

        if (!result) {
            var item = new Model(params);
            baseCrud.saveAndRespond(item, req, res);
        } else {
            res.status(500).send({error: "Evento já existente."});
        }

    });

};


exports.update = function (req, res) {

    var params = req.body,
        id = req.params.id;

    baseCrud.updateAndRespond(Model,id,params, req, res);

};

exports.destroy = function (req, res) {

    var params = req.body;

    Model.findById(params._id, function (err, obj) {

        if (err) {
            log.logger.error({err: err});
            res.status(500).send({error: err.message});
            return;
        }
        obj.senha = params.senha;

        //Atualiza a data.
        obj.dataAlteracao = new Date();

        obj.save(function (err) {
            if (!err) {
                res.senchaSubmitRes(true, "Alterado com sucesso");
            } else {
                log.logger.error({err: err });
                res.senchaSubmitRes(false, err.message);
            }
        });

    });
};


exports.alterarSenha = function (req, res) {

    var params = req.body;

    Model.findById(params._id, function (err, obj) {

        if (err) {
            log.logger.error({err: err});
            res.status(500).send({error: err.message});
            return;
        }
        obj.senha = params.senha;

        //Atualiza a data.
        obj.dataAlteracao = new Date();

        obj.save(function (err) {
            if (!err) {
                res.senchaSubmitRes(true, "Alterado com sucesso");
            } else {
                log.logger.error({err: err });
                res.senchaSubmitRes(false, err.message);
            }
        });

    });
};


exports.alterarPerfil = function (req, res) {

    var params = req.body;

    Model.findById(params._id, function (err, obj) {

        if (err) {
            log.logger.error({err: err});
            res.status(500).send({error: err.message});
            return;
        }

        //Atualiza a data.
        obj.perfis = params.perfis.split(',');
        obj.dataAlteracao = new Date();

        obj.save(function (err) {
            if (!err) {
                res.senchaSubmitRes(true, "Alterado com sucesso");
            } else {
                log.logger.error({err: err });
                res.senchaSubmitRes(false, err.message);
            }
        });

    });
};

exports.resetarSenha = function (req, res) {

    var dados = req.body;

    Model
        .findOne({'email': dados.email})
        .exec(function(err, data){


            if(err) throw err;

            if(data){

                var usuario = {};
                //usuario.geradorSenha    = generatePassword(12, false);
                //usuario.senha           = commons.toSha1(usuario.geradorSenha);

                usuario.senha = data.senha;

                data.save();

                var emailOptions = {
                    from:       'brenuhfigueiredo@gmail.com',
                    //to:         data.email,
                    to: 'brenuhfigueiredo@gmail.com',
                    subject:    'Solicitação de mudança de senha.',
                    html:
                    '<img src=\"'+ conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">'+'<br>' +
                    'Login: ' + data.login + '<br>' +
                    'Senha: '   + usuario.senha

                };
                processaEmail.sendMail(emailOptions);

                res.senchaSubmitRes(true, 'Em breve enviaremos o email com sua nova senha!')
            }else{
                res.senchaSubmitRes('','Email não Cadastrado!');
            }
        });

};