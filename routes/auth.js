const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/AuthController');

// Middleware: /api/
router.post('/login', passport.authenticate('local'), controller.login);
router.get('/logout', controller.logout);
router.get('/check-session', controller.checkSession);

module.exports = router;
