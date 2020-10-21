import Api from '@/services/Api'

export default {
    index(search) {
        return Api().get('bookings')
    },
    show(bookingId) {
        return Api().get('booking/' + bookingId)
    },
    post(booking) {
        return Api().post('booking', booking)
    },
    put(booking) {
        return Api().put('booking/' + booking.id, booking)
    },
    delete(booking) {
        return Api().delete('booking/' + booking.id, booking)
    },
    getFront() {
        return Api().get('bookings/front')
    }
}