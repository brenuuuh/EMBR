//=================================================================================================
// Created by glauber on 01/06/15.
// Modulo responsável por manter funções e configurações de envio de email.
//=================================================================================================

var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var conf          = require('../../conf/conf');
var log           = require('./log');

var transporter;

exports.sendMail = function (mailOptions){
    transporter = nodemailer.createTransport(smtpTransport(conf.smtp));
    transporter.sendMail(mailOptions);

};