/**
 * Created by breno on 28/10/15.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/eventos');

router.get('/', controller.read);
router.put('/:id', controller.confirmaPresenca);
router.post('/novo', controller.cadastrarEvento);
//router.put('/:id', controller.update);
router.delete('/:nome', controller.destroy);
module.exports = router;
