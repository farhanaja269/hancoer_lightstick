const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rute untuk register
router.post('/register', userController.register);

// Nanti kalau butuh login, tinggal tambahin di sini
// router.post('/login', userController.login);

module.exports = router;