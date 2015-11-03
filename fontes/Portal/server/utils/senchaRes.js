//=================================================================================================
//Sencha Resources
//Modulo com recusros e métodos para facilitar a integração com o Sencha;
//=================================================================================================

var mongoose  = require('mongoose');
var removeAtt = require('./middleware/remove-att');

exports.init = function (app) {

    //Adiciona função ao prototipo de response
    app.response.senchaRes = function (status, data, count) {
        return this.send({data: data, status: status, total: count});
    };

    //Adiciona função ao prototipo de response para form submit do sencha
    app.response.senchaSubmitRes = function (success, msg) {
        return this.send({msg: msg, success: success});
    };

    //Registra middleware
    app.use(removeAtt());

}

exports.parseSort = function (query, req) {

    if (req.query.sort) {
        var sort = JSON.parse(req.query.sort);
        var sortParam = {};
        sortParam[sort[0]['property']] = sort[0]['direction'].toLowerCase();
        query.sort(sortParam);
    }

    return query;
};
/**
 * Traduz os parametros do SenchaFilter para um where da query do mongoose
 * @param query Query mongoose
 * @param req - requisicao com filter enviado pelo Sencha
 * @returns Query
 */
exports.parseFilter = function (query, req) {

    if (req.query.filter && query) {
        var filter = JSON.parse(req.query.filter);
        filter.forEach(function (filter) {
            if (filter.value) {


                if (filter.type === 'objectId') {
                    filter.value = mongoose.Types.ObjectId(filter.value);
                }

                if (filter.operator === '=') {

                    query.where(filter.property).equals(filter.value);

                } else if (filter.operator === '<') {

                    query.where(filter.property).lt(filter.value);

                } else if (filter.operator === '&gt;') {

                    query.where(filter.property).gt(filter.value);

                } else if (filter.operator === '<=') {

                    query.where(filter.property).lte(filter.value);

                } else if (filter.operator === '&gt;=') {

                    query.where(filter.property).gte(filter.value);

                } else if (filter.operator === 'like') {

                    query.where(filter.property).regex(filter.value);

                } else if (filter.operator === '!=') {

                    query.where(filter.property).ne(filter.value);

                } else if (filter.operator === 'in') {

                    query.where(filter.property).in(filter.value);

                } else if (filter.operator === 'nin') {

                    query.where(filter.property).nin(filter.value);

                } else if (filter.operator === 'between') {

                    var valorIni = filter.value[0],
                        valorFim = filter.value[1];

                    if (filter.type === 'date') {

                        valorIni = valorIni ? new Date(filter.value[0]) : null;
                        valorFim = valorFim ? new Date(filter.value[1]) : null;
                    }

                    if (valorIni && valorFim) {
                        query.where(filter.property).gte(valorIni).lte(valorFim);
                    }
                    else if (valorIni) {
                        query.where(filter.property).gte(valorIni);
                    }
                    else if (valorFim) {
                        query.where(filter.property).lte(valorFim);
                    }

                }
            }
        });
    }

    return query;
}

/**
 * Traduz os parametros do SenchaFilter para um Objeto match
 * @param req - requisicao com filter enviado pelo Sencha
 * @returns {}
 */
exports.parseFilterMatch = function (req) {

    var match = {$match: {}};

    if (req.query.filter) {
        var filter = JSON.parse(req.query.filter);
        filter.forEach(function (filter) {
            if (filter.value) {

                if (filter.type === 'objectId') {
                    filter.value = mongoose.Types.ObjectId(filter.value);
                }

                if (filter.operator === '=') {

                    match.$match[filter.property] = filter.value;

                } else if (filter.operator === '<') {

                    match.$match[filter.property] = {$lt: filter.value};

                } else if (filter.operator === '&gt;') {

                    match.$match[filter.property] = {$gt: filter.value};

                } else if (filter.operator === '<=') {

                    match.$match[filter.property] = {$lte: filter.value};

                } else if (filter.operator === '&gt;=') {

                    match.$match[filter.property] = {$gte: filter.value};


                } else if (filter.operator === 'like') {

                    match.$match[filter.property] = {$regex: new RegExp('^' + filter.value + '$', "i")};

                } else if (filter.operator === '!=') {

                    match.$match[filter.property] = {$ne: filter.value};

                } else if (filter.operator === 'between') {

                    var valorIni = filter.value[0],
                        valorFim = filter.value[1];

                    // match.$match[filter.property] = {};

                    if (filter.type === 'date') {

                        valorIni = valorIni ? new Date(filter.value[0]) : null;
                        valorFim = valorFim ? new Date(filter.value[1]) : null;
                    }

                    if (valorIni && valorFim) {
                        match.$match[filter.property] = {$gte: valorIni, $lte: valorFim};
                    }
                    else if (valorIni) {
                        match.$match[filter.property] = {$gte: valorIni};
                    }
                    else if (valorFim) {
                        match.$match[filter.property] = {$lte: valorFim};
                    }
                }
            }
        });
    }

    return match;
}
