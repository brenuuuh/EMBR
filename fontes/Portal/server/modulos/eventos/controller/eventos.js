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
var dateFormat = require('dateformat');

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

exports.destroy = function (req, res) {

    var params = req.params;



    Model.findOne({nome: params.nome}, function (err, obj) {


        if (err) {
            log.logger.error({err: err});
            res.status(500).send({error: err.message});
            return;
        }


        obj.remove(function (err) {
            if (!err) {
                res.senchaSubmitRes(true, "Excluído com sucesso");
            } else {
                log.logger.error({err: err});
                res.senchaSubmitRes(false, err.message);
            }
        });

    });
};

exports.confirmaPresenca = function (req, res) {

    var params = req.body,
        id = req.params.id;


    Model.findOne({'nome': params.nome}, function (err, evento) {


        if (err) {


            log.logger.error({err: err, req: req });
            res.status(500).send({error: "Erro ao atualizar registro. Um relatório de erro foi gerado."});
            return;
        }

        if (!evento) {

            res.status(404).send({error: "Registro não encontrado para atualizar."});
            return;
        }

        //Utilizo o Underscore para atualizar todas as variaveis do obj com os parametros passados.
        evento.nome = params.nome;
        evento.descricao = params.descricao;
        evento.tipo = params.tipo;
        evento.faixa = params.faixa;
        data = params.dataEvento.toLocaleString('%d-%m-%Y');
        evento.dataEvento = data;
        evento.horaEvento = params.horaEvento;
        evento.cidade = params.cidade;
        evento.estado = params.estado;
        evento.local = params.local;

        evento.save(function (err) {

            if (!err) {

                var emailOptions = {
                    from: 'embr@embr.com.br',
                    to:         req.user.email,
                    //to: 'veridiane.pedrosa@gmail.com',
                    subject: 'Dados do evento confirmado',
                    html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                    'Nome: ' + evento.nome + '<br>' +
                    'Descrição: ' + evento.descricao + '<br>' +
                    'Tipo: ' + evento.tipo + '<br>' +
                    'Classificação: ' + evento.faixa + '<br>' +
                    'Status: ' + evento.status + '<br>' +
                    'Data do Evento: ' + evento.dataEvento + '<br>' +
                    'Hora do Evento: ' + evento.horaEvento + '<br>'+
                    'Cidade: ' + evento.cidade + '<br>'+
                    'Estado: ' + evento.estado + '<br>'+
                    'Local do Evento: ' + evento.local + '<br>'


                };
                processaEmail.sendMail(emailOptions);

                res.senchaSubmitRes(true, 'Enviando email para o usuário!');


            } else {
                log.logger.error({err: err, req: req});
                res.status(500).send({error: msgErro + err.message || ''});
            }
        });

    });

};