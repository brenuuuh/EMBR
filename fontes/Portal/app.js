//=================================================================================================
// Importando Módulos
//=================================================================================================

var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var plainParser     = require('./server/utils/middleware/text-plain');
var mongoose        = require('mongoose');
var session         = require('express-session');
var autoIncrement   = require("mongoose-auto-increment");
var swig            = require('swig');
var compression     = require('compression');


//Modulos Proprios
var pessoa          = require('./server/modulos/pessoa/pessoa');
var usuario         = require('./server/modulos/usuario/usuario');
var log             = require('./server/utils/log');
var conf            = require('./conf/conf');
var sencha          = require('./server/utils/senchaRes');
var evento         = require('./server/modulos/eventos/eventos');
//var produto         = require('./server/modulos/produto/produto');
//var vendedor        = require('./server/modulos/vendedor/vendedor');
//=================================================================================================

var app = express();

var dbPath = 'mongodb://' + (conf.ipmongo || '127.0.0.1') + '/' + conf.nomedbmongo;

app.use(compression());
//=================================================================================================
// Requisições estáticas
//=================================================================================================
app.use('/', express.static(path.join(__dirname, 'cliente')));
//=================================================================================================

app.use(morgan(conf.env));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(plainParser());


var connection = function() {
    return mongoose.connect(dbPath,  {server: {auto_reconnect: true}}, function (err) {
        log.logger.info('Tentando conexao com: ' + dbPath);
        if (err) {
            //log.logger.fatal('ERRO ao conectar a: ' + dbPath + '. ' + err);
            log.logger.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connection, 5000);
        } else {
            log.logger.info('Conectado a: ' + dbPath);
        }
    });
}
autoIncrement.initialize(connection());

//sessao
var MongoStore = require('connect-mongo')(session); //salvar sessao no mongodb

app.use(session({
    secret: 'NODEJSPADRAOWEB',
    maxAge: new Date(Date.now() + 3600000),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(
        {url: dbPath},
        function (err) {
            //console.log(err || 'connect-mongodb setup ok');
        })
}));

//=================================================================================================
//Inicializa modulos
//=================================================================================================

sencha.init(app);
log.init(app);
usuario.init(app);
pessoa.init(app);
evento.init(app);
//empresa.init(app);
//produto.init(app);
//vendedor.init(app);
//=================================================================================================

module.exports = app;
