const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const User = require('./User');
const Train = require('./Train');

const Booking = sequelize.define('Booking', {
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('booked', 'cancelled'),
        defaultValue: 'booked'
    }
});

User.hasMany(Booking);
Booking.belongsTo(User);

Train.hasMany(Booking);
Booking.belongsTo(Train);

module.exports = Booking;
