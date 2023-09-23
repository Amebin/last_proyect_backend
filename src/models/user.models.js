import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

mongoose.pluralize(null)

const collection = 'users'

const schema = new mongoose.Schema({
  
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user'], default: 'user' },
    cart: { type: Array, required: true, default: [] },
})

schema.plugin(mongoosePaginate)

const userModel = mongoose.model(collection, schema)

export default userModel
