const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/AuthController');

router.route('/').post(login);
router.route('/logout').post(logout);

module.exports = router;