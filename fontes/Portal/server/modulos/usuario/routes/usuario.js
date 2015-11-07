var express = require('express');
var router = express.Router();
var controller = require('../controller/usuario');

router.get('/', controller.read);
router.post('/', controller.add);
router.post('/senha', controller.alterarSenha);
router.post('/perfil', controller.alterarPerfil);
router.put('/:id', controller.update);
router.put('/alteracao/:id', controller.alteraEnd);
router.delete('/:id', controller.destroy);
router.post('/resetPasswd', controller.resetarSenha);
router.post('/novo', controller.novoUsuario);
router.get('/userLogado', controller.readByUserLogado);
module.exports = router;
