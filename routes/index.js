const express = require('express');
const indexController = require('../controllers/indexController');
const userRoutes = require('./userRoutes');
const joueurRoutes = require('./joueurRoutes');
const equipeRoutes = require('./equipeRoutes');
const imageRoutes = require('./imageRoutes');
//const blogRoutes = require('./blogRoutes');
//const commentRoutes = require('./commentRoutes');
const classementRoutes = require('./classementRoutes');
const resultatRoutes = require('./resultatRoutes');
const router = express.Router();

router.post('/register', indexController.register);
router.post('/login', indexController.login);
router.post('/logout', indexController.logout);

router.use('/user', userRoutes);
router.use('/joueur', joueurRoutes);
router.use('/equipe', equipeRoutes);
router.use('/image', imageRoutes);
//router.use('/blog', blogRoutes);
//router.use('/comment', commentRoutes);
router.use('/classement', classementRoutes);
router.use('/resultat', resultatRoutes)

module.exports = router;