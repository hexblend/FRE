const express = require('express');
const router = express.Router();

const multer = require('multer'); // allows access files submitted through forms
const cloudinary = require('cloudinary'); // config and upload
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'avatars',
	allowedFormats: ['jpg', 'png'],
	transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
const parser = multer({ storage: storage });

const controller = require('../controllers/UserController');

// Middleware: /api/users/
router.get('/', controller.getAllUsers);
router
	.route('/:id')
	.get(controller.getSingleUser)
	.put(controller.updateUser)
	.delete(controller.deleteUser);

router.get('/type/:type', controller.getUsersByType);
router.get('/job/:job1/:job2?/:job3?', controller.getUsersByJob);

router.post('/register', controller.createUser);

router.patch(
	'/changeAvatar/:id',
	parser.single('image'),
	controller.changeAvatar
);
router.patch('/addToFavs/:id', controller.addToFavourites);
router.patch('/makeInactive/:id', controller.makeInactive);
router.patch('/makeActive/:id', controller.makeActive);

router.post('/send_message/:id', controller.sendMessage);
router.get('/view_messages/:id1/:id2', controller.viewMessages);
module.exports = router;
