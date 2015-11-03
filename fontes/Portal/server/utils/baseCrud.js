//=================================================================================================
//Base Crud
//Operações Basicas de um Crud com Mongoose e Sencha
//=================================================================================================

var mongoose  = require('mongoose');
var _         = require('underscore');
var senchaRes = require('./senchaRes');
var log       = require('../utils/log');

var msgErro = "Erro ao realizar operação. Um relatório de erro foi enviado ao desenvolvedor. ";

/**
 * Salva um item e retorna para o cliente.
 * @param item
 */
exports.saveAndRespond = function (item, req, res) {

    //Salva no modelo empresa e filial da sessao
    if (item['empresa']) {
        item['empresa'] = req.user.empresa;
    }
    if (item['filial']){
        item['filial'] = req.session.filial;
    }
    item.usuInclusao = req.user._id;

    item.dataInclusao = new Date();
    item.sequencial = null;

    item.save(function (err) {

        if (!err) {
            res.senchaRes(true, item);

        } else {

            if (err.code === 11000) {
                res.status(500).send({error: "Erro ao inserir registro. Registro duplicado."});
                return;
            }

            log.logger.error({err: err, req: req});
            res.status(500).send({error: msgErro + err.message || ''});
        }
    });
};

/**
 * Faz um update em um item, porém faz a busca atualiza os parametros e salva
 * É feito desse jeito pois somente com Save as funções pre do mongoose são chamadas.
 * @param id
 * @param params
 * @param res
 */
exports.updateAndRespond = function (Model, id, params, req, res) {

    Model.findOne({_id: id, empresa: req.user.empresa }, function (err, obj) {

        if (err) {

            log.logger.error({err: err, req: req });
            res.status(500).send({error: "Erro ao atualizar registro. Um relatório de erro foi gerado."});
            return;
        }


        if (!obj) {
            res.status(404).send({error: "Registro não encontrado para atualizar."});
            return;
        }

        //Atualiza a data.
        obj.dataAlteracao = new Date();
        obj.usuAlteracao = req.user._id;
        obj['empresa'] = req.user.empresa;
        obj['filial'] = req.session.filial;

        console.log(obj.contaTotalizadora);

        //Utilizo o Underscore para atualizar todas as variaveis do obj com os parametros passados.
        obj = _.extend(obj, params);

        obj.save(function (err) {

            if (!err) {
                res.senchaRes(true, obj);

            } else {
                log.logger.error({err: err, req: req});
                res.status(500).send({error: msgErro + err.message || ''});
            }
        });


    });
};

/**
 * Remove por Id e responde
 * @param item
 */
exports.removeAndRespond = function (Model, id, res) {
    Model.findOne({"_id": id, empresa: res.req.user.empresa}, function (err, model) {

        if (!err && model) {

            model.remove(function(err){

                if(err){
                    res.status(500).send({error: "Erro ao remover registro. " + err.message || '' });
                }else{
                    res.send({success: true});
                }
            });

        } else {
            log.logger.error({err: err, req: res.req });
            res.status(500).send({error: msgErro});
        }

    });
};

/**
 * Retorna resulado das querys do Read
 * @param Model - Modelo do Crud
 * @param query - Passa a query a ser feita, será aplicado os filtros sencha e sort
 * @param req
 * @param res
 */
exports.readAndRespond = function (query, count, req, res, transform) {

    query.skip(req.query.start || 0);

    //Colocar um limit default de 1000 para evitar erro do mongo quando o resultado for maior que 4mb
    query.limit(req.query.limit || 1000);

    if(req.query.populate){
        if(Array.isArray(req.query.populate))
            req.query.populate.forEach(function(reg){ query.populate(reg); });
        else
            query.populate(req.query.populate)
    }

    query = setTenancy(query, req);
    query = senchaRes.parseFilter(query, req);
    query = senchaRes.parseSort(query, req);

    if(count){
        count = setTenancy(count, req);
        count = senchaRes.parseFilter(count, req);
    }

    //Executar a query
    query.exec(function (err, rec) {

        if (err) {
            log.logger.error({err: err, req: req });
            return res.senchaRes(false, {error: msgErro});
        }

        if(transform){
            rec = transform(rec);
        }

        if (count) {
            //Responde com o count
            count.count(function (err, count) {
                res.senchaRes(true, rec, count || 0);
            });

        } else {
            res.senchaRes(true, rec);
        }

    });


};

/**
 * Le dados da base para um combobox, aplicando tenancy e fazendo parse dos store filters.
 * @param query
 * @param fields no estilo select do mongoose
 * @param req
 * @param res
 * @param transform
 */
exports.comboAndRespond = function (query, req, res, transform) {

    query = setTenancy(query, req);


    if(req.query.fields) {

        if(Array.isArray(req.query.fields))
            query.select(req.query.fields.join(' '));
        else
            query.select(req.query.fields);
    }

    if(req.query.populate){

        if(Array.isArray(req.query.populate))
            req.query.populate.forEach(function(reg){ query.populate(reg); });
        else
            query.populate(req.query.populate)

    }

    query = senchaRes.parseFilter(query, req);
    query = senchaRes.parseSort(query, req);

    //Executar a query
    query.exec(function (err, rec) {

        if (err) {
            log.logger.error({err: err, req: req });
            return res.senchaRes(false, {error: msgErro});
        }

        if(transform){
            rec = transform(rec);
        }

        res.senchaRes(true, rec);


    });


};

exports.basicResponse = function (query, req, res, transform) {

    //Pega todos os atributos do model da query
    query = setTenancy(query, req);

    //Executar a query
    query.exec(function (err, rec) {

        if (err) {
            log.logger.error({err: err, req: req });
            res.status(500).send({error: msgErro + err.message || '' });
        }

        if(transform){
            rec = transform(rec);
        }

        res.senchaRes(true, rec);

    });


};

exports.callbackResponse = function (res, err, result) {

    if (err) {
        log.logger.error({err: err});
        res.status(500).send({error:  err.message || msgErro   });
    }else {
        res.senchaRes(true, result);
    }


};

exports.sendErrorResponse = function (res, err) {

    log.logger.error({err: err });
    res.status(500).send({error: err.message || "Erro não especificado."});

};


/**
 * Seta as variaveis de sessao como condição na query, se o modelo possuir estes atributos
 * @param query
 * @param req
 */
function setTenancy(query, req){

    //Pega todos os atributos do model da query
    var paths = query.model.schema.paths;

    if(paths.empresa){
        // O user é fornecido la pelo passport
        query.where('empresa').equals(req.user.empresa);
    }

    if(paths.filial && !req.query.empresaOnly){
        //a filial selecionada e gravada na sessao toda vez que o usuario troca no combo na interface
        query.where('filial').equals(req.session.filial);
    }

    return query;
}