 /*
 * Criptografia Avancoi.ini
 *
 * Entrada: Concatenação das informações abaixo,
 * levando em consideração 0 - False (não) e 1 - True (sim)
 *
 * CNPJ                                      : 14
 * Tem Pré Venda                             : 1
 * Tem DAV                                   : 1
 * Tem Tef Discado                           : 1
 * Tem Tef Dedicado                          : 1
 * Data Validade TEF                         : 6
 * Data Validade PDV                         : 6
 * AtoCotep Em Vigor                         : 1
 * Permite Remontar GT                       : 1
 * Permite Impressora não fiscal na Produção : 1
 * Permite Impressão de DAV                  : 1
 * Calcula Tot. ICMS                         : 1
 * Aceita DAV Bloqueado                      : 1
 * Coleta Web Ativada                        : 1
 * Importa NFe                               : 1
 * Tem Controle de Conta                     : 1
 * Tem Ind. Tec. Produção                    : 1
 *
 * Exemplo: 4279009700012311113112163112171111110011
 *
 * Saída: B8K9BXH5U7UK9H9TFURR98HN8FFU98H5TTFF8KXHHTTF8
 *
 * Criptrografia Ecfs.ini
 *
 * Entrada: Bloco de 25 posições conforme definido abaixo
 *
 * Impressora :25
 * Série      :25
 * GT         :25
 *
 * Deve ser feito uma chamada para cada item, criptografando separadamente cada bloco
 *
 *
 * Exemplo:
 *
 * Entrada:
 *
 * impressora = "BEMATECH                 ";
 *
 * Saída: "ÂÅÍÁÔÅÃÈðåòöóõðåòöóõðåòöó"
 *
 * Entrada:
 *
 * serie = "BE12345678901234567890123";
 *
 * Saída: "ÂÅá÷áâæãçýëæâçãñçàäíéõãäà"
 *
 * Entrada:
 *
 * gt = "                 12345678";
 *
 * Saída: "óõðåòöóõðåòöóõðåòçáæäðäáë"
 *
 */





var crip = require('./AvCript');

function iniciaTest(){

    var valor = "4279009700012311113112163112171111110011";

    var criptografia = crip.criptoAvanco(valor);
    console.log(criptografia);

    var descriptografia = crip.descriptoAvanco(criptografia);
    console.log(descriptografia);

    if (!valor == descriptografia){
        console.log ("Erro: Criptografias nao conferem!");
    }

    var impressora = "BEMATECH                 ";
    var serie = "BE12345678901234567890123";
    var gt = "                 12345678";

    var criImpressora = crip.encriptaPW(impressora, 25);
    console.log(criImpressora);
    descriptografia = crip.encriptaPW(criImpressora, 25 );
    console.log(descriptografia);


    var criSerie = crip.encriptaPW(serie, 25);
    console.log(criSerie);
    descriptografia = crip.encriptaPW(criSerie, 25 );
    console.log(descriptografia);


    var criGT = crip.encriptaPW(gt, 25);
    console.log(criGT);
    descriptografia = crip.encriptaPW(criGT, 25 );
    console.log(descriptografia);
}

iniciaTest();
