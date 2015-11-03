/**
 * Created by glauber on 06/01/15.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/interface');

router.post('/selecionar', controller.selecionarFilial);


module.exports = router;
