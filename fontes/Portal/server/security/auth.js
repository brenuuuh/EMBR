//===================================================================================================
//Inicializa a parte de login do app, utilizando passport.
//===================================================================================================
exports.init = function (app) {

    //Carregar modulos.
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose'),
        Usuario = mongoose.model('Usuario'),
        path = require('path'),
        AES = require('../utils/AES'),
        FacebookStrategy = require('passport-facebook').Strategy,
        FACEBOOK_APP_ID = '634704503336176',
        FACEBOOK_APP_SECRET = '7c2786cea26b425c5a0b49e1c9dd0ba4';
    //===================================================================================================
    //Urls Liberadas

    var whitelist = [
        {method: 'POST', path: '/usuario'},
        {method: 'POST', path: '/usuario/resetPasswd'},
        {method: 'GET', path: '/auth/facebook'}
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

            if(!user || err){
                return done(err, user);

            }

            mongoose.model('Usuario').findOne({'cpf': user.cpf}).exec(function (err, usuario) {
                user['Usuario'] = usuario.cpf;
                done(err, user);
            });
        })


    });
    
    passport.use(new FacebookStrategy({
    
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:9000/auth/facebook/callback'
        },
        function(accessToken, refreshToken, profile, done){
            process.nextTick(function(){
                return done(null, profile);
                });
          }      
    ));

    app.use(passport.initialize());
    app.use(passport.session());


    //======================================================================
    //Rotas e midlewares
    //======================================================================

    //Informa se está logado ou não.
    app.get('/authenticated', function (req, res) {
        //console.log('Está autenticado? ' +  (req.isAuthenticated() ? ' +To sim+ ' : ' +To não+'))
        res.send(req.isAuthenticated());
    });

    //Autentica um usuário deve enviar um post com form url encoded
    //parametros login e senha
    app.post('/login', passport.authenticate('local'), function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send('true');
        }
    );
    
    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: 'email'}
        ));
        
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/'
       })
    );

    //Logout
    app.get('/logout', function (req, res) {
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
        res.status(401).send({error: "Não autorizado"});

    });


    ////Informa qual usuario esta logado.
    app.get('/user', function (req, res) {

        res.senchaRes(true, req.user);

    });

    app.get('/userEnd', function (req, res) {


        mongoose.model('Usuario').findOne({'cpf': req.user.cpf}).exec(function (err, usuario) {


            req.user._doc['Logradouro'] = usuario.Logradouro;
            req.user._doc['Numero'] = usuario.Numero;
            req.user._doc['Cep'] = usuario.Cep;
            req.user._doc['Complemento'] = usuario.Complemento;
            req.user._doc['Bairro'] = usuario.Bairro;
            req.user._doc['Estado'] = usuario.Estado;
            req.user._doc['Cidade'] = usuario.Cidade;
            res.send( req.user);

        });



    });

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