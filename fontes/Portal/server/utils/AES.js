/**
 * Created by vidmar on 26/02/15.
 */

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'AVANCOSUPERWEB1188@';

exports.encrypt = function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.decrypt = function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
