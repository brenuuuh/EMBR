/*
 * Created by glauber on 16/09/15.
 * Tradução de classe feita em Java por Davidson que foi traduzida de modulo feito em VB por Klinger
 *
 ***************************************************************
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
 ****************************************************************
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

var base1 = "APJ5HE2MDX62WF4PJGZ7BXVT1F3LS98DS9UHFG43QWMZCVFRTG785YJKHDA478UYEWFRT569KMVCAQW23U7H6V4C9I8M7HBV4RDU";
var base2 = "SGT7592HLXZQ45V7M9J8FGQAWSED34KBX8U5TGFA9W2MUJS34AZ8X9QYBRKDWZV7916P3EDCKPM2B6TYK98X32ARMQ8H5E16S3WY";
var base3 = "LR9DTN6X24QU593DGVFMW34PKXA2JUGTCY7S52ZALG798YHBV235GFXKYS9876TYHLSWA29BRDW47FXZEW76KMHG93YH5BV3XZAS";
var base4 = "09QALJKXZ09MLASPKCGBZ498U812MX091NCG8K3MCAGS981NX0RTHNAS78CB12YU3ZX67GASJHC687G12BZ7610SKJHF51902PSX";
var base5 = "PQW0SXLKMCVGUDIW5EHSD2JALS4J7KJD6HF0Q982834D97AKHSDUIY76152AHGSCJF4Z265R91287HBCUFSG81276YJHGBZXUCYT";


function xor(a, b){
    return (a ^ b );
};

function xorb(){
    return (a ^ b );
};

function mid(text, initPosition, size){

    return text.substring(initPosition-1,initPosition-1+size);

};

function right(text, size){

    //size++;
    var position = text.length - size;
    if (position < 0){
        return text;
    }

    var rightedText = "";
    while (position < text.length){
        rightedText = rightedText + text.charAt(position);
        position++;
    }
    return rightedText;
};

function left(text, size){

    if (text.length < size){
        return text;
    }

    var leftedText = "";
    var position = 0;
    while (position < size){
        leftedText = leftedText + text.charAt(position);
        position++;
    }

    return leftedText;


};

function rPad(text, character, size){
    var padedValue = text;

    while (padedValue.length < size){
        padedValue = padedValue + character;
    }

    return padedValue;
};



function criptPdv(stringText, passWord){
    var x = "";
    var n, j, p;
    var flag = true;

    p=0;

    for (var i = 0; i < stringText.length; i++) {
        if (p >= passWord.length){
            p = 0;
        }
        j = passWord.charCodeAt(p);

        if (j > 128) {
            j = 0;
        }
        n = stringText.charCodeAt(i);
        flag = true;
        while(flag){

            n = (xor(n, j));

            if (n < 33){//mudou: era 31

                n = (n +  128);

                flag = true;
            } else if (n > 127 && n < 160){//mudou era 159
                n =  (n - 128);
                flag = true;
            } else if (n > 290){//era 290
                n = 31;
                flag = true;
            } else if (n > 167 && n < 192){//correção diferença de codepag
                n = n - 128;
                flag = false;
            } else if (n > 90 && n < 128){//correcao: era 127 mas colidia com verificacoes anteriores
                n = n + 128;
                flag = false;
            } else if (n == 205 && p == 4){ //diferenca de mapa: caracter nao representavel
                //considera apenas na coincidencia da letra M com a letra R na quinta posição
                n = 376;
                flag = false;
            } else {
                flag = false;
            }

        }
        x = x + '' + String.fromCharCode(n);
        p++;
    }

    return x;
};



exports.encriptaPW = function (vgSt, vgTam){
    var x = "";

    x = rPad(vgSt, "+", vgTam);
    x = criptPdv(x, "SUPERV");

    if (x.indexOf('+') > -1){
        x = x.substring(0, x.indexOf('+'));
    }

    return x;

};


exports.criptoAvanco = function (entrada){

    var cripAv = "";
    var entrada1 = "", entrada2 = "", entrada3 = "", entrada4 = "", entrada5 = "";
    var tab1 = new Array(10);
    var tab2 = new Array(10);
    var tab3 = new Array(10);
    var tab4 = new Array(10);
    var tab5 = new Array(10);
    var posicao1, posicao2, posicao3, posicao4, posicao5;
    var trecho1 = "", trecho2 = "", trecho3 = "", trecho4 = "", trecho5 = "";
    var saida = "", saida1 = "", saida2 = "", saida3 = "", saida4 = "", saida5 = "";

    if (entrada.length == 21){
        entrada1 = left(entrada, 7);
        entrada2 = mid(entrada, 8, 7);
        entrada3 = right(entrada, 7);
        posicao1 = 1 + parseInt(Math.random() * 9);
        posicao2 = 1 + parseInt(Math.random() * 9);
        posicao3 = 1 + parseInt(Math.random() * 9);

        trecho1 = mid (base1, ((posicao1 * 10) + 1), 10);
        trecho2 = mid (base2, ((posicao2 * 10) + 1), 10);
        trecho3 = mid (base3, ((posicao3 * 10) + 1), 10);

        for (var fi1 = 1; fi1 <= 10; fi1++){

            tab1[fi1] = mid(trecho1, fi1, 1);
            tab2[fi1] = mid(trecho2, fi1, 1);
            tab3[fi1] = mid(trecho3, fi1, 1);

        }

        for (var fi2 = 1; fi2 <= 7; fi2++){

            saida1 = saida1 + tab1[mid(entrada1, fi2, 1) + 1];
            saida2 = saida2 + tab2[mid(entrada2, fi2, 1) + 1];
            saida3 = saida3 + tab3[mid(entrada3, fi2, 1) + 1];

        }
        saida = saida1 + '' + posicao1 + '' + saida2 + '' + posicao2 + '' + saida3 +  '' + posicao3;
        var fi3;
        for (var fj3 = 1; fj3 <= 4; fj3++){
            fi3 = fj3;
            while (fi3 <= 24){
                cripAv = cripAv + mid(saida, fi3, 1);
                fi3 = fi3 + 4;
            }
        }

        return cripAv;

    } else {
        entrada1 = mid(entrada, 1, 8);
        entrada2 = mid(entrada, 9, 8);
        entrada3 = mid(entrada, 17, 8);
        entrada4 = mid(entrada, 25, 8);
        entrada5 = mid(entrada, 33, 8);

        posicao1 = 1 + parseInt((Math.random() * 9));
        posicao2 = 1 + parseInt((Math.random() * 9));
        posicao3 = 1 + parseInt((Math.random() * 9));
        posicao4 = 1 + parseInt((Math.random() * 9));
        posicao5 = 1 + parseInt((Math.random() * 9));

        trecho1 = mid (base1, ((posicao1 * 10) + 1), 10);
        trecho2 = mid (base2, ((posicao2 * 10) + 1), 10);
        trecho3 = mid (base3, ((posicao3 * 10) + 1), 10);
        trecho4 = mid (base4, ((posicao4 * 10) + 1), 10);
        trecho5 = mid (base5, ((posicao5 * 10) + 1), 10);

        for (var fi4 = 1; fi4 <= 10; fi4++){

            tab1[fi4] = mid(trecho1, fi4, 1);
            tab2[fi4] = mid(trecho2, fi4, 1);
            tab3[fi4] = mid(trecho3, fi4, 1);
            tab4[fi4] = mid(trecho4, fi4, 1);
            tab5[fi4] = mid(trecho5, fi4, 1);

        }

        for (var fi5 = 1; fi5 <= 8; fi5++){

            saida1 = saida1 + tab1[parseInt(mid(entrada1, fi5, 1)) + 1];
            saida2 = saida2 + tab2[parseInt(mid(entrada2, fi5, 1)) + 1];
            saida3 = saida3 + tab3[parseInt(mid(entrada3, fi5, 1)) + 1];
            if ((mid(entrada4, fi5, 1)).length>0){
                saida4 = saida4 + tab4[parseInt(mid(entrada4, fi5, 1)) + 1];
            }
            if ((mid(entrada5, fi5, 1)).length>0){
                saida5 = saida5 + tab5[parseInt(mid(entrada5, fi5, 1)) + 1];
            }

        }

        saida = saida1 + '' + posicao1 + '' + saida2 + '' + posicao2 + '' + saida3 + '' + posicao3 + '' + saida4 + '' + posicao4 + '' + saida5 + '' + posicao5;

        var fi6;
        for (var fj6 = 1; fj6 <= 5; fj6++){
            fi6 = fj6;
            while (fi6 <= 45){
                cripAv = cripAv + mid(saida, fi6, 1);
                fi6 = fi6 + 5;
            }
        }

        return cripAv;

    }

};



exports.descriptoAvanco = function (cripto){

    var posicao1, posicao2, posicao3, posicao4, posicao5;
    var trecho1 = "", trecho2 = "", trecho3 = "", trecho4 = "", trecho5 = "";
    var saida = "", saida1 = "", saida2 = "", saida3 = "", saida4 = "", saida5 = "";
    var ppp;
    var recomposto = "";

    if (cripto.length < 29){
        var iA;
        for(var jA = 1; jA <= 6; jA++){
            iA = jA;
            while(iA <= 24){
                saida = saida + mid(cripto, iA, 1);
                iA = iA + 6;
            }
        }

        posicao1 = mid(saida, 8, 1);
        posicao2 = mid(saida, 16, 1);
        posicao3 = mid(saida, 24, 1);

        trecho1 = mid(base1, ((posicao1 * 10) + 1), 10);
        trecho2 = mid(base2, ((posicao2 * 10) + 1), 10);
        trecho3 = mid(base3, ((posicao3 * 10) + 1), 10);

        for (var iB = 1; iB <= 7; iB++){

            ppp = (trecho1.indexOf(mid(saida, iB, 1)));
            recomposto = recomposto + ppp;

        }

        for (var iC = 9; iC <= 15; iC++){

            ppp = (trecho2.indexOf(mid(saida, iC, 1)));
            recomposto = recomposto + '' + ppp.toString().trim();

        }

        for (var iD = 17; iD <= 23; iD++){

            ppp = (trecho3.indexOf(mid(saida, iD, 1)));
            recomposto = recomposto + '' + ppp.toString().trim();

        }

        return recomposto;

    } else {

        var iA;
        for(var jA = 1; jA <= 9; jA++){
            iA = jA;
            while(iA <= 45){
                saida = saida + mid(cripto, iA, 1);
                iA = iA + 9;
            }
        }

        posicao1 = mid(saida, 9, 1);
        posicao2 = mid(saida, 18, 1);
        posicao3 = mid(saida, 27, 1);
        posicao4 = mid(saida, 36, 1);
        posicao5 = mid(saida, 45, 1);

        trecho1 = mid(base1, ((posicao1 * 10) + 1), 10);
        trecho2 = mid(base2, ((posicao2 * 10) + 1), 10);
        trecho3 = mid(base3, ((posicao3 * 10) + 1), 10);
        trecho4 = mid(base4, ((posicao4 * 10) + 1), 10);
        trecho5 = mid(base5, ((posicao5 * 10) + 1), 10);

        for(var iB = 1; iB <= 8; iB++){
            ppp = (trecho1.indexOf(mid(saida, iB, 1)));
            saida1 = saida1 + '' + ppp.toString().trim();
            recomposto = recomposto + '' + ppp.toString().trim();
        }

        for(var iC = 10; iC <= 17; iC++){
            ppp = (trecho2.indexOf(mid(saida, iC, 1)));
            saida2 = saida2 + '' + ppp.toString().trim();
            recomposto = recomposto + ''  + ppp.toString().trim();
        }

        for(var iD = 19; iD <= 26; iD++){
            ppp = (trecho3.indexOf(mid(saida, iD, 1)));
            saida3 = saida3 + '' + ppp.toString().trim();
            recomposto = recomposto + '' + ppp.toString().trim();
        }

        for(var iE = 28; iE <= 35; iE++){
            ppp = (trecho4.indexOf(mid(saida, iE, 1)));
            saida4 = saida4 + '' + ppp.toString().trim();
            recomposto = recomposto + '' + ppp.toString().trim();
        }

        for(var iF = 37; iF <= 44; iF++){
            ppp = (trecho5.indexOf(mid(saida, iF, 1)));
            saida5 = saida5 + '' + ppp.toString().trim();
            recomposto = recomposto + '' + ppp.toString().trim();
        }

        return (saida1 + saida2 + saida3 + saida4 + saida5);
    }

};