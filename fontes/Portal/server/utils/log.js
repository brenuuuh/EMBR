//=================================================================================================
// Logger Json Utilizando o modulo Bunyan
//=================================================================================================

var bunyan            = require('bunyan');
var Tail              = require('tail').Tail;
var fs                = require('fs');
var openConnections   = [];
var mongoose          = require('mongoose');
var conf              = require('../../conf/conf');

//Logar erros para o mongodb
var LogEntrySchema = new mongoose.Schema({
    msg: String,
    level: Number,
    name: String,
    time: Date,
    res : Object,
    req : Object,
    err : Object
});
var LogEntryModel  = mongoose.model('RelatorioFalha', LogEntrySchema);
var LogEntryStream = require('bunyan-mongodb-stream')({model: LogEntryModel});

module.exports = {

    logger: undefined,
    init: function (app) {

        //Cria pasta de log
        fs.existsSync('../logs') || fs.mkdirSync('../logs');

        //Cria o logger.
        var logger = bunyan.createLogger({
            src: true,
            name: 'ERP',
            serializers: {
                req: reqSerializer
            },
            streams: [
                {
                    type: 'file',
                    path: '../logs/erp.log',
                    level: conf.env === 'dev' ? "debug" : "info"

                },
                {
                    stream: process.stdout,
                    level: "info"
                },
                {
                    stream: LogEntryStream,
                    level: "error"
                }
            ]
        });

        logger.info('Aplicação Inicializada');

        //Registra o server sent event para o log
        app.get('/log', this.sseLog);

        //Registra middleware para logar as requests
        app.use(function (req, res, next) {

            logger.info({req: req}, req.method + ' para ' + req.url );
            next();

        });

        //Da tail no log e manda a linha pro sse
        var tail = new Tail("../logs/erp.log");

        tail.on("line", function(data) {
            // we walk through each connection
            openConnections.forEach(function(resp) {
                escreveMsg(resp, data);
            });
        });

        this.logger = logger;

    },
    sseLog: function (req, res) {

        // set timeout as high as possible
        req.socket.setTimeout(Infinity);

        // send headers for event-stream connection
        // see spec for more information
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        res.write('\n');

        // push this res object to our global variable
        openConnections.push(res);

        // When the request is closed, e.g. the browser window
        // is closed. We search through the open connections
        // array and remove this connection.
        req.on("close", function () {
            var toRemove;
            for (var j = 0; j < openConnections.length; j++) {
                if (openConnections[j] == res) {
                    toRemove = j;
                    break;
                }
            }
            openConnections.splice(j, 1);
        });

    }
};

//Escreve mensagem sse para o cliente
function escreveMsg(resp, data){
    var d = new Date();
    resp.write('id: ' + d.getMilliseconds() + '\n\n');
    resp.write('data:' + data +   '\n\n'); // Note the extra newline
}

// Funcao que serializa um objeto para o bunyan
function reqSerializer(req) {
    return {
        method: req.method,
        url: req.path,
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body
    }
}