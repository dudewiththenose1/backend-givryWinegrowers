const express = require('express');
const joueurController = require('../controllers/joueurController');
const router = express.Router();

router.get('/:id', joueurController.read);
router.get('/', joueurController.readAll);
router.delete('/:id', joueurController.delete);
router.put('/', joueurController.modify);
router.post('/', joueurController.create);

module.exports = router;