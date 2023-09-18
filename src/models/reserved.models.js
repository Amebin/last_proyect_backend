import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'bookings'

const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'rooms', required: true }, 
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true }
})

const reservationModel = mongoose.model(collection, schema);

export default reservationModel;


