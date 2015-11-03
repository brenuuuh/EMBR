/**
 * Created by glauber on 08/01/15.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/situacao');

router.get('/', controller.read);
router.post('/', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
