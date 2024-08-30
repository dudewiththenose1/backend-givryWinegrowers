const express = require('express');
const equipeController = require('../controllers/equipeController');
const router = express.Router();

router.get('/:id', equipeController.read);
router.get('/', equipeController.readAll);
router.delete('/:id', equipeController.delete);
router.put('/', equipeController.modify);
router.post('/', equipeController.create);

module.exports = router;