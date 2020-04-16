const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');

// Middleware: /api/users/
router.get('/', controller.getAllUsers);
router.get('/type/:type', controller.getUsersByType);
router.get('/:id', controller.getSingleUser);
router.post('/register', controller.createUser);
router.patch('/update/:id', controller.updateUser);
router.patch('/addToFavs/:id', controller.addToFavourites);
router.patch('/makeInactive/:id', controller.makeInactive);
router.patch('/makeActive/:id', controller.makeActive);
router.delete('/:id', controller.deleteUser);

module.exports = router;
