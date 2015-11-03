/**
 * Created by glauber on 06/01/15.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/perfil');

//router.get('/', controller.read);
//router.post('/', controller.add);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.destroy);
router.post('/envio', controller.enviarFaleConosco);
router.post('/alteracao', controller.enviarAlteracoes);
module.exports = router;
