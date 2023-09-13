import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { roomsRoutes } from './routes/rooms.routes.js'
/* import { usersRoutes } from './routes/users.routes.js'
 */
dotenv.config()

const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const app = express()

app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    origin: '*' // modificar antes del deploy
}));
app.use(express.urlencoded({ extended: true }));

/* app.use('/api/users', usersRoutes());
 */app.use('/api/rooms', roomsRoutes());
app.all('*', (req, res) => {
    res.status(404).send({ status: 'ERR', data: 'No se encuentra el endpoint solicitado' })
})

app.listen(EXPRESS_PORT, async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(`Backend inicializado puerto ${EXPRESS_PORT}`)
    } catch (err) {
        console.error(err.message)
    }
})
