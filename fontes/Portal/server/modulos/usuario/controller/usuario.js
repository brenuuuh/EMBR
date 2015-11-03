var mongoose = require('mongoose');
var Model = mongoose.model('Usuario');
var baseCrud = require('../../../utils/baseCrud');
var log = require('../../../utils/log');
var commons = require('../../../utils/commons');
var generatePassword    = require('password-generator');
var processaEmail = require('../../../utils/email');
var conf = require('../../../../conf/conf');

exports.read = function (req, res) {

    baseCrud.readAndRespond(Model.find(), Model.find(), req, res);
};

exports.add = function (req, res) {


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
                //item.geradorSenha    = generatePassword(12, false);
                //item.senha           = commons.toSha1(dados.geradorSenha);
                item.senha           = dados.senha;
                item.save(function (err) {
                    if (!err) {

                        var emailOptions = {
                            from: 'brenuhfigueiredo@hotmail.com',
                            to:         item.email,
                            //to: 'breno.ads@hotmail.com',
                            subject: 'Dados para login no Sistema',
                            html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                            'Login: ' + item.login + '<br>' +
                            'Senha: ' + item.senha + '<br>'
                            //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                        };
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
                            //usuario.geradorSenha    = generatePassword(12, false);
                            //usuario.senha           = commons.toSha1(usuario.geradorSenha);
                            item.senha           = dados.senha;

                            //console.log("Senha", item.geradorSenha);

                            item.save(function (err) {
                                if (!err) {

                                    var emailOptions = {
                                        from: 'brenuhfigueiredo@gmail.com',
                                        to:   item.email,
                                        //to: 'breno.ads@hotmail.com',
                                        subject: 'Dados para login no Sistema',
                                        html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                                        'Login: ' + item.login + '<br>' +
                                        'Senha: ' + item.senha + '<br>'
                                        //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                                    };
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
                //item.geradorSenha    = generatePassword(12, false);
                //item.senha           = commons.toSha1(dados.geradorSenha);
                item.senha           = dados.senha;
                item.save(function (err) {
                    if (!err) {

                        var emailOptions = {
                            from: 'brenuhfigueiredo@hotmail.com',
                            to:         item.email,
                            subject: 'Dados para login no Sistema',
                            html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                            'Login: ' + item.login + '<br>' +
                            'Senha: ' + item.senha + '<br>'
                            //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                        };
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
                            //usuario.geradorSenha    = generatePassword(12, false);
                            //usuario.senha           = commons.toSha1(usuario.geradorSenha);
                            item.senha           = dados.senha;

                            //console.log("Senha", item.geradorSenha);

                            item.save(function (err) {
                                if (!err) {

                                    var emailOptions = {
                                        from: 'brenuhfigueiredo@gmail.com',
                                        to:   item.email,
                                        //to: 'breno.ads@hotmail.com',
                                        subject: 'Dados para login no Sistema',
                                        html: '<img src=\"' + conf.dominio + '/imagem/cabecEmail\" alt=\"EMBR\">' + '<br>' +
                                        'Login: ' + item.login + '<br>' +
                                        'Senha: ' + item.senha + '<br>'
                                        //'<a href=' + conf.dominio + '>Clique aqui para acessar!</a>'

                                    };
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

    baseCrud.readAndRespond(Model.find({'email': req.body.email}), Model.find({'email': req.body.email}), req, res);
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