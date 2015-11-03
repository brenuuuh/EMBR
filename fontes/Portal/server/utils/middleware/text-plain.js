//==================================================================================
//Middleware para aceitar e filtrar requisicões text-plain
//Vidmar 04/12/14
//==================================================================================

exports = module.exports = function plainParser() {
    return function plainParser(req, res, next) {

        if (req.is('text/plain')) {

            req.text = '';
            req.setEncoding('utf8');

            req.on('data', function (chunk) {
                req.text += chunk
            });

            req.on('end', next);

        } else {
            next();
        }
    };
};
