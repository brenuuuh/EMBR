//=====================================================================================
//Configuracao para modo desenvolvimento ou producao.
//Para inicializar como produção ou desenvolvimento basta setar a variavel de ambiente NODE_ENV para 'dev' ou 'prod'.
//=====================================================================================


var development = {
    dominio: '127.0.0.1:9000', //A aplicacao necessita saber qual dominio esta rodando, ex: Enviar emails com links para o app
    porta: 9000, //Porta do servidor
    ipmongo: 'localhost', //'192.168.100.247', // Ip do server MONGO
    nomedbmongo: 'embr', //Nome da base de dados
    instancias: 1, //Quantidade de instancias da aplicacao 0 = automatico
    loglevel: 'debug', //fatal, error, warn, info, debug, trace
    env: global.process.env.NODE_ENV || 'dev'
};

exports = module.exports = global.process.env.NODE_ENV === 'dev' ? development : development;