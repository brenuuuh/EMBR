//=====================================================================================
//Configuracao para modo desenvolvimento ou producao.
//Para inicializar como produção ou desenvolvimento basta setar a variavel de ambiente NODE_ENV para 'dev' ou 'prod'.
//=====================================================================================


var development = {
    dominio: '127.0.0.1:3000', //A aplicacao necessita saber qual dominio esta rodando, ex: Enviar emails com links para o app
    porta: 3000, //Porta do servidor
    ipmongo: 'localhost', //'192.168.100.247', // Ip do server MONGO
    nomedbmongo: 'embr', //Nome da base de dados
    instancias: 1, //Quantidade de instancias da aplicacao 0 = automatico
    loglevel: 'debug', //fatal, error, warn, info, debug, trace
    env: global.process.env.NODE_ENV || 'dev',
    smtp: {
        host: "smtp.sendgrid.net",
        port: 25,
        auth: {
            user: "igordiasth",
            pass: "Avanco123"
        }
    }
};

var production = {
    dominio: '127.0.0.1',
    porta: 7000, //Deve estar rodando como root para setar portas menores que 1024
    instancias: 0, //Automatico
    ipmongo: '192.168.0.247',
    nomedbmongo: 'padrao',
    loglevel: 'error',
    env: global.process.env.NODE_ENV || 'prod',
    smtp: {
        host: "smtp.gmail.com",
        port: 25,
        auth: {
            user: "igordiasth",
            pass: "Avanco123"
        }
    }
};


exports = module.exports = global.process.env.NODE_ENV === 'dev' ? development : production;