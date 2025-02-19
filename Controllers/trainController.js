// controllers/trainController.js
const Train = require('../model/Train');

exports.addTrain = async (req, res) => {
    try {
        const { train_name, source, destination, total_seats } = req.body;

        const train = await Train.create({
            train_name,
            source,
            destination,
            total_seats,
            available_seats: total_seats
        });

        res.status(201).json({ message: 'Train added successfully', train });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateTrain = async (req, res) => {
    try {
        const { id } = req.params;
        const { total_seats } = req.body;

        const train = await Train.findByPk(id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        train.total_seats = total_seats;
        train.available_seats = total_seats;
        await train.save();

        res.json({ message: 'Train updated successfully', train });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getSeatAvailability = async (req, res) => {
    try {
        const { source, destination } = req.query;
        console.log(source);
        const trains = await Train.findAll({
            where: { source, destination }
        });

        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
