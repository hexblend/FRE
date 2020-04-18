const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');

// Middleware: /api/users/
router.get('/', controller.getAllUsers);
router
	.route('/:id')
	.get(controller.getSingleUser)
	.put(controller.updateUser)
	.delete(controller.deleteUser);
router.get('/type/:type', controller.getUsersByType);
router.post('/register', controller.createUser);
router.patch('/addToFavs/:id', controller.addToFavourites);
router.patch('/makeInactive/:id', controller.makeInactive);
router.patch('/makeActive/:id', controller.makeActive);

module.exports = router;
