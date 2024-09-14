const express = require('express');
const { signupUser, loginUser, getUserById, updateUserById } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');


const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/:id', requireAuth, getUserById);

router.patch('/:id', requireAuth, updateUserById);


module.exports = router;