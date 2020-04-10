const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');

// Middleware: /api/users/
router.get('/', controller.getAllUsers);
router.get('/type/:type', controller.getUsersByType);
router.get('/get', controller.getSingleUser);
router.post('/register', controller.createUser);
router.patch('/update', controller.updateUser);
router.patch('/addToFavs', controller.addToFavourites);
router.delete('/', controller.deleteUser);

module.exports = router;
