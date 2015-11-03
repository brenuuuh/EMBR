///**
// * Created by breno on 16/09/15.
// */
//var async = require('async');
//
//module.exports = function (mongoose) {
//
//    var Schema = mongoose.Schema;
//    var filial = new Schema({
//        cnpjFilial: {type: String},
//        RazaoSocial: {type: String},
//        NomeFantasia: {type: String},
//        Email:       {type: String},
//        Logradouro: {type: String},
//        Numero: {type: String},
//        Complemento: {type: String},
//        Cep: {type: String},
//        Bairro: {type: String},
//        Cidade: {type: String},
//        Estado: {type: String}
//    });
//
//    var Model = new Schema({
//        cnpjEmpresa: {type: String},
//        razaoEmpresa: {type: String},
//
//        filiais: {type: [filial], default: []}
//
//
//    });
//
//    Model.statics.getByEmpresa = function (cnpj, callback) {
//        mongoose.model('empresa')
//            .findOne()
//            .where('cnpjEmpresa').equals(cnpj)
//            .exec(callback);
//    };
//
//
//
//    Model.statics.inseredados = function (novaEmpresa, callback) {
//        var Emp = mongoose.model('empresa');
//        // console.log(callback);
//        Emp
//            .findOne({"cnpjEmpresa": novaEmpresa.cnpjEmpresa})
//            .exec(function (err, empresa) {
//
//                if (empresa) {
//
//                    var filial = empresa.filiais.id(empresa.filiais.filter(function (item) {
//
//                        if (item.cnpjFilial === novaEmpresa.filiais[0].cnpjFilial) {
//                            //console.log(item.cnpjFilial  + " = " + novaEmpresa.filiais[0].cnpjFilial );
//                            return item._id;
//                        }
//                    })[0]);
//
//                    if (filial) {
//                        filial.NomeFantasia = novaEmpresa.filiais[0].NomeFantasia;
//                        filial.RazaoSocial = novaEmpresa.filiais[0].RazaoSocial;
//                        filial.Logradouro = novaEmpresa.filiais[0].Logradouro;
//                        filial.Email      = novaEmpresa.filiais[0].Email;
//                        filial.Numero = novaEmpresa.filiais[0].Numero;
//                        filial.Complemento = novaEmpresa.filiais[0].Complemento;
//                        filial.Cep = novaEmpresa.filiais[0].Cep;
//                        filial.Bairro = novaEmpresa.filiais[0].Bairro;
//                        filial.Cidade = novaEmpresa.filiais[0].Cidade;
//                        filial.Estado = novaEmpresa.filiais[0].Estado;
//
//                        empresa.save(function (err) {
//                            return callback();
//                        });
//
//
//                    } else {
//                        empresa.filiais.push(novaEmpresa.filiais[0]);
//                        empresa.save(function (err) {
//                            return callback();
//                        });
//                    }
//                } else {
//                    var emp = new Emp(novaEmpresa);
//                    emp.save(function (err, emp) {
//                            return callback();
//                    });
//                }
//
//            });
//
//
//    }
//
//
//
//    return mongoose.model('empresa', Model);
//};
//
//
