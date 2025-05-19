const express = require('express');
const { registerUser, loginUser, getUserProfile ,setPassword,loginGoogle} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/set-password', setPassword);
router.post('/logingoogle', loginGoogle);

module.exports = router;
