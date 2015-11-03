/**
 * Todos os modelos a serem utilizados no mongoose devem ser incluidos no array models.
 * Desta forma ao chamar a funcao initialize, podemos registrar todos os modelos do mongo.
 * A ordem desta declaracao fa diferenca, se um modelo A faz referencia a um modelo B devemos importar o modelo B primeiro
 * Created by mauriciomiranda on 9/17/14.
 */

var mongoose = require('mongoose');

exports.load = function (models) {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        //console.log('Registrando moongoose Schema: ' + models[i]);
        require(models[i])(mongoose);
    }
};
