const { Booking } = require('../models')
module.exports = {
    // get all booking
    async index(req, res) {
        try {
            const bookings = await Booking.findAll()
            res.send(bookings)
        } catch (err) {
            res.status(500).send({
                error: 'The bookings information was incorrect'
            })
        }
    },
    // create booking
    async create(req, res) {
        try {
            const booking = await Booking.create(req.body)
            res.send(booking.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Booking already in system'
            })
        }
    },
    // edit booking, suspend, active
    async put(req, res) {
        try {
            await Booking.update(req.body, {
                where: {
                    id: req.params.bookingId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update booking incorrect'
            })
        }
    },
    // delete booking
    async remove(req, res) {
        try {
            const booking = await Booking.findOne({
                where: {
                    id: req.params.bookingId
                }
            })
            if (!booking) {
                return res.status(403).send({
                    error: 'The booking information was incorrect'
                })
            }
            await booking.destroy()
            res.send(booking)
        } catch (err) {
            res.status(500).send({
                error: 'The booking information was incorrect'
            })
        }
    },
    // get booking by id
    async show(req, res) {
        try {
            const booking = await Booking.findById(req.params.bookingId)
            res.send(booking)
        } catch (err) {
            req.status(500).send({
                error: 'The booking information was incorrect'
            })
        }
    },
    async getFront(req, res) {
        try {
            const bookings = await Booking.findAll()
            let listNames = []
            bookings.forEach(booking => {
                let name = {
                    "id": booking.id,
                    "name": `${booking.name} ${booking.lastname}`
                }
                listNames.push(name)
            })
            res.send(listNames)
        } catch (err) {
            res.status(500).send({
                error: 'The bookings information was incorrect'
            })
        }
    },
}