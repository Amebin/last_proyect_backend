import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'rooms'

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: Array }],
    description: { type: String, required: true },
    avaliableDates: { type: Date, required: true },
});

const roomModel = mongoose.model(collection, schema);

export default roomModel;