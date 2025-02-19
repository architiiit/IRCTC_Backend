// controllers/bookingController.js
const { Sequelize } = require('sequelize');
const Booking = require('../model/Booking');
const Train = require('../model/Train');

exports.bookSeat = async (req, res) => {
    console.log("hello")
    let { trainId, source, destination } = req.body;
    let userId = req.user?.userId; // Extracted from JWT

    // Log values to check if they are valid
    console.log("Received Booking Request:");
    console.log("User ID (from JWT):", userId);
    console.log("Train ID:", trainId);
    console.log("Source:", source);
    console.log("Destination:", destination);

    try {
        // Convert trainId and userId to integers
        trainId = parseInt(trainId, 10);
        userId = parseInt(userId, 10);

        if (isNaN(trainId) || isNaN(userId)) {
            console.error("Invalid ID format:", { trainId, userId });
            return res.status(400).json({ message: 'Invalid trainId or userId format' });
        }

        // Start transaction
        const t = await Booking.sequelize.transaction();

        // Lock the train row for safe updating
        const train = await Train.findOne({ where: { id: trainId }, lock: t.LOCK.UPDATE, transaction: t });

        if (!train) {
            console.error("Train not found for ID:", trainId);
            await t.rollback();
            return res.status(404).json({ message: 'Train not found' });
        }

        if (train.available_seats <= 0) {
            console.error("No seats available for Train ID:", trainId);
            await t.rollback();
            return res.status(400).json({ message: 'No seats available' });
        }

        // Reduce seat count
        train.available_seats -= 1;
        await train.save({ transaction: t });

        // Create booking
        const booking = await Booking.create({ 
            userId, trainId, source, destination 
        }, { transaction: t });

        await t.commit();
        console.log("Booking Successful:", booking);
        res.status(201).json({ message: 'Booking successful', booking });

    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getBookingDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id, {
            include: ['Train', 'User']
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
