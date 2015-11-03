//===================================================================================================
//Inicializa a parte de login do app, utilizando passport.
//===================================================================================================
exports.init = function (app) {

    //Carregar modulos.
    var passport      = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose      = require('mongoose'),
        Usuario       = mongoose.model('Usuario'),
        path          = require('path'),
        AES           = require('../utils/AES');

    //===================================================================================================
    //Urls Liberadas

    var whitelist = [
        {method: 'POST', path: '/saida'},
        {method: 'POST', path: '/reducaoz'},
        {method: 'POST', path: '/usuario'}
    ];

    //===================================================================================================

    //Configura estrategia de login local no passport.
    passport.use(

        new LocalStrategy({
                usernameField: 'login',
                passwordField: 'senha'
            },
            function (login, pass, done) {

                Usuario.login(login, pass, function (err, user) {

                    if (err) {
                        return done(err);
                    }

                    return done(null, user);

                });

            }
        ));

    //Passport coloca o id do usuario na sessao. (Cookie)
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    //Retira o id do usuario da sessao e pega todos os dados do mongodb.
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id, function (err, user) {
            if(!user || err) {
                done(err, user);
            }

            mongoose.model('Usuario').findOne({'cpf': user.cpf}).exec(function (err, usuario) {
                user['Usuario'] = usuario.email;
                done(err, user);
            });
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());


    //======================================================================
    //Rotas e midlewares
    //======================================================================

    //Informa se está logado ou não.
    app.get('/authenticated', function(req, res){
            res.send(req.isAuthenticated());
    });

    //Informa qual usuario esta logado.
    app.get('/user', function(req, res){
        res.senchaRes(true, req.user);
    });

    //Autentica um usuário deve enviar um post com form url encoded
    //parametros login e senha
    app.post('/login', passport.authenticate('local'), function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send('true');
        }
    );

    //Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.send('done');
    });

    //Verifica se o usuário está mesmo logado. (Global)Isso vale para todas as request após esta.
    app.use(function (req, res, next) {

        // Se esta logado prossegue.
        if (req.isAuthenticated() || whitelisted(req)) {
            return next();
        }

        // Se não estiver Unauthorized
        res.status(401).send({ error: "Não autorizado/Apikey inválida." });

    });



    function checkApiKey(req){

        if(req.headers.apikey){

            var ids = AES.decrypt(req.headers.apikey).split('|');

            req.user = {login: 'api'};
            req.user.empresa = ids[0];
            req.session.filial  = ids[1];

            return true;

        }else{

            console.log('Apikey nao informada.');
            return false;

        }



    }



    /**
     * Utilizando apikey agora.
     * @param req
     * @returns {boolean}
     */
    function whitelisted(req) {


        //Pra entender melhor o uso do every
        //http://stackoverflow.com/questions/6260756/how-to-stop-javascript-foreach
        return !whitelist.every(function (url) {
            if (req.method === url.method && req.path === url.path) {
                //O false interrompe o every.
                return false;
            }
            return true;
        });
    }
};
