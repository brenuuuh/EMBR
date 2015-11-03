//==================================================================================
//Middleware que remove todos os atributos vazios mandados pelo sencha,
//ele manda vazio para todos campos não preenchidos quando é inclusao de um objeto.
//Vidmar 04/12/14
//==================================================================================

exports = module.exports = function removeAttVazio() {
    return function (req, res, next) {

        //Coloca nulo nos parametros que vierem ""
        if (req.body  ) {
            for (var property in req.body) {
                if (req.body.hasOwnProperty(property)) {
                    if (req.body[property] === '') {
                        req.body[property] = null;
                    }
                }
            }
        }

        next();

    };
};
