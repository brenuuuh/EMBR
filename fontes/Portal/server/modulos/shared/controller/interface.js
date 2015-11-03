/**
 * Created by glauber on 06/01/15.
 */
var mongoose = require('mongoose');
var baseCrud = require('../../../utils/baseCrud');
var log      = require('../../../utils/log');
var commons  = require('../../../utils/commons');

var Pessoa   = mongoose.model('Pessoa');


exports.selecionarFilial = function (req, res) {

    var idFilial = req.body.filial;

    Pessoa.getFilialById(idFilial, req.user.empresa, function (err, filial) {

        if (err) {
            return res.status(500).send(err);
        }

        if (filial) {

            req.session.filial = req.body.filial;
            res.status(200).send();

        } else {
            res.status(401).send();
        }


    });

};

