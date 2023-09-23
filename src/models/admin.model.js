import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'admins';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
});

schema.plugin(mongoosePaginate);

const adminModel = mongoose.model(collection, schema);

export default adminModel;
