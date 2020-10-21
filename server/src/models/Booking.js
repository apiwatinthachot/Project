module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        number: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        roomname: DataTypes.STRING,
        people: DataTypes.STRING,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        timeout: DataTypes.STRING,
        detail: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Booking
}