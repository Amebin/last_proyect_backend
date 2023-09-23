import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'staff';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['staff'], default: 'staff' },
});

schema.plugin(mongoosePaginate);

const staffModel = mongoose.model(collection, schema);

export default staffModel;
