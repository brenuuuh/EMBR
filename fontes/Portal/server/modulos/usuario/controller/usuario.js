var mongoose = require('mongoose');
var Model = mongoose.model('Usuario');
var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');
var generatePassword    = require('password-generator');
var processaEmail = require('../../../utils/email');
var _ = require('underscore');
var conf = require('../../../../conf/conf');

exports.read = function (req, res) {

    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
};

exports.add = function (req, res) {

    var dados = req.body;

    Model
        .findOne({"email": dados.email})
        .exec(function(err, usuario){
            if (!usuario) {

                var item = new Model();

                item.nome = dados.nome;
                item.cpf = dados.cpf;
                item.email = dados.email;
                item.dataNasc = dados.dataNasc;
                item.dataInclusao = new Date();
                item.dataAlteracao = null;
                item.login = dados.email;
                item.geradorSenha    = generatePassword(12, false);
                item.senha           = commons.toSha1(item.geradorSenha);
                item.logradouro = dados.logradouro,
                item.numero = dados.numero,
                item.cep = dados.cep,
                item.complemento = dados.complemento,
                item.bairro = dados.bairro,
                item.cidade = dados.cidade,
                item.estado = dados.estado
                item.save(function (err) {
                    if (!err) {

                        var emailOptions = {
                            from: 'embr@embr.com.br',
                            to:         item.email,
                            //to: 'veridiane.pedrosa@gmail.com',
                            subject: 'Dados para login no Sistema',
                            html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                            'Login: ' + item.login + '<br>' +
                            'Senha: ' + item.geradorSenha + '<br>'
                            //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                        };

                        console.log("login: "+ item.login);
                        console.log("senha: "+ item.geradorSenha);
                        processaEmail.sendMail(emailOptions);

                        res.senchaRes(true, item);

                    } else {
                        log.logger.error({err: err, req: req});
                        res.status(500).send({error: msgErro + err.message || ''});
                    }

                });

            }


            else {

                Model
                    .findOne({"email": dados.email})
                    .exec(function (err, usuario)
                    {

                        if (usuario) {

                            log.logger.error({err: err, req: req});
                            res.status(500).send({error: "Usuário já cadastrado", tipo:0});

                        } else {

                            var item = new Model();

                            item.nome = dados.nome;
                            item.cpf = dados.cpf;
                            item.email = dados.email;
                            item.dataNasc = dados.dataNasc;
                            item.dataInclusao = new Date();
                            item.dataAlteracao = null;
                            item.login = dados.email;
                            item.geradorSenha    = generatePassword(12, false);
                            item.senha           = commons.toSha1(item.geradorSenha);
                            item.logradouro = dados.logradouro,
                            item.numero = dados.numero,
                            item.cep = dados.cep,
                            item.complemento = dados.complemento,
                            item.bairro = dados.bairro,
                            item.cidade = dados.cidade,
                            item.estado = dados.estado
                            item.save(function (err) {
                                if (!err) {

                                    var emailOptions = {
                                        from: 'embr@embr.com.br',
                                        to:   item.email,
                                        //to: 'veridiane.pedrosa@gmail.com',
                                        subject: 'Dados para login no Sistema',
                                        html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                                        'Login: ' + item.login + '<br>' +
                                        'Senha: ' + item.geradorSenha + '<br>'
                                        //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                                    };

                                    console.log("login: "+ item.login);
                                    console.log("senha: "+ item.geradorSenha);
                                    processaEmail.sendMail(emailOptions);

                                    res.senchaRes(true, item);

                                } else {
                                    log.logger.error({err: err, req: req});
                                    res.status(500).send({error: msgErro + err.message || ''});
                                }

                            });
                        }
                    });

            }
        });

};

exports.novoUsuario = function (req,res){

    var dados = req.body;

    Model
        .findOne({"cpf": dados.cpf})
        .exec(function(err, usuario){
            if (!usuario) {

                var item = new Model();

                item.nome = dados.nome;
                item.cpf = dados.cpf;
                item.email = dados.email;
                item.dataNasc = dados.dataNasc;
                item.dataInclusao = new Date();
                item.dataAlteracao = null;
                item.login = dados.email;
                item.geradorSenha    = generatePassword(12, false);
                item.senha           = commons.toSha1(item.geradorSenha);
                item.logradouro = dados.logradouro,
                item.numero = dados.numero,
                item.cep = dados.cep,
                item.complemento = dados.complemento,
                item.bairro = dados.bairro,
                item.cidade = dados.cidade,
                item.estado = dados.estado
                item.save(function (err) {
                    if (!err) {

                        var emailOptions = {
                            from: 'brenuhfigueiredo@hotmail.com',
                            to:         item.email,
                            subject: 'Dados para login no Sistema',
                            html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                            'Login: ' + item.login + '<br>' +
                            'Senha: ' + item.geradorSenha + '<br>'
                            //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                        };

                        console.log("login: "+ item.login);
                        console.log("senha: "+ item.geradorSenha);
                        processaEmail.sendMail(emailOptions);

                        res.senchaRes(true, item);

                    } else {
                        log.logger.error({err: err, req: req});
                        res.status(500).send({error: msgErro + err.message || ''});
                    }

                });

            }


            else {

                Model
                    .findOne({"cpf": dados.cpf})
                    .exec(function (err, usuario)
                    {

                        if (usuario) {

                            log.logger.error({err: err, req: req});
                            res.status(500).send({error: "Usuário já cadastrado", tipo:0});

                        } else {

                            var item = new Model();

                            item.nome = dados.nome;
                            item.cpf = dados.cpf;
                            item.email = dados.email;
                            item.dataNasc = dados.dataNasc;
                            item.dataInclusao = new Date();
                            item.dataAlteracao = null;
                            item.login = dados.email;
                            item.geradorSenha    = generatePassword(12, false);
                            item.senha           = commons.toSha1(item.geradorSenha);
                            item.logradouro = dados.logradouro,
                            item.numero = dados.numero,
                            item.cep = dados.cep,
                            item.complemento = dados.complemento,
                            item.bairro = dados.bairro,
                            item.cidade = dados.cidade,
                            item.estado = dados.estado
                            item.save(function (err) {
                                if (!err) {

                                    var emailOptions = {
                                        from: 'brenuhfigueiredo@gmail.com',
                                        to:   item.email,
                                        //to: 'breno.ads@hotmail.com',
                                        subject: 'Dados para login no Sistema',
                                        html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                                        'Login: ' + item.login + '<br>' +
                                        'Senha: ' + item.geradorSenha + '<br>'
                                        //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                                    };
                                    console.log("login: "+ item.login);
                                    console.log("senha: "+ item.geradorSenha);
                                    processaEmail.sendMail(emailOptions);

                                    res.senchaRes(true, item);

                                } else {
                                    log.logger.error({err: err, req: req});
                                    res.status(500).send({error: msgErro + err.message || ''});
                                }

                            });
                        }
                    });

            }
        });

} ;

exports.readByUserLogado = function (req, res) {
    var dados = req.user;

    baseCrud.readAndRespond(Model.findOne({'cpf': dados.cpf}), Model.findOne({'cpf': dados.cpf}), req, res);
};


exports.update = function (req, res) {

    var params = req.body,
        id = req.params.id;

    baseCrud.updateAndRespond(Model,id,params, req, res);

};


exports.alteraEnd = function (req, res) {

    var params = req.body;
    var id = req.params.id;

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
        obj.senha = commons.toSha1(params.usuSen);

        //Atualiza a data.
        obj.dataAlteracao = new Date();

        obj.save(function (err) {
            if (!err) {
                res.senchaSubmitRes(true, "Alterado com sucesso");
            } else {
                log.logger.error({err: err});
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
            usuario.geradorSenha    = generatePassword(12, false);
            usuario.senha           = commons.toSha1(usuario.geradorSenha);

            data.senha = usuario.senha;


            data.save();

            var emailOptions = {
                from:       'brenuhfigueiredo@gmail.com',
                to:         data.email,
                //to: 'veridiane.pedrosa@gmail.com',
                subject:    'Solicitação de mudança de senha.',
                html:
                '<img src=\"'+ conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">'+'<br>' +
                'Login: ' + data.login + '<br>' +
                'Senha: '   + usuario.geradorSenha

            };
            console.log('Senha: '+ usuario.geradorSenha);

            processaEmail.sendMail(emailOptions);

            res.senchaSubmitRes(true, 'Em breve enviaremos o email com sua nova senha!')
        }else{
            res.senchaSubmitRes('','Email não Cadastrado!');
        }
    });

};