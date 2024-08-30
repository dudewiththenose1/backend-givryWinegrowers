const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', userController.read);
router.delete('/', userController.delete);
router.put('/', userController.modify);

module.exports = router;