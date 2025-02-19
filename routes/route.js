const express = require('express');
const router = express.Router();
const {register,login}= require('../Controllers/authController');
const trainController = require('../Controllers/trainController');
const bookingController = require('../Controllers/bookingController');

const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);


router.post('/add', adminMiddleware, trainController.addTrain);
router.put('/update/:id', adminMiddleware, trainController.updateTrain);
router.get('/availability', trainController.getSeatAvailability);


router.post('/book', authMiddleware, bookingController.bookSeat);
router.get('/booking/details/:id', authMiddleware, bookingController.getBookingDetails);

module.exports = router;
