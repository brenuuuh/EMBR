/**
 * Created by breno on 28/10/15.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/eventos');

router.get('/', controller.read);
router.post('/confirma', controller.confirmaPresenca);
router.post('/novo', controller.cadastrarEvento);
router.delete('/:nome', controller.destroy);
router.put('/:id', controller.update);
module.exports = router;
