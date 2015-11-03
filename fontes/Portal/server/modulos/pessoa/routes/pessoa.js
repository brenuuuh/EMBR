var express = require('express');
var router = express.Router();
var controller = require('../controller/pessoa');

router.get('/', controller.read);
router.post('/', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/apikey', controller.apikey);

//router.get('/decrypt', controller.decrypt);

module.exports = router;