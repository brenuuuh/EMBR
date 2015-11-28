/**
 * Created by breno.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/perfil');

router.post('/envio', controller.enviarFaleConosco);
module.exports = router;
