import mongoose from 'mongoose'
import { Router } from 'express'

import roomModel from '../models/rooms.models.js'
import reservationModel from '../models/reserved.models.js'
import { avoidConsecutiveSpaces, isIsoDate, verifyToken, checkRoles, checkRequired } from '../middlewares/rooms.middleware.js'

import { body, validationResult } from 'express-validator'

export const reservedRoutes = ()  => {
    const router = Router()

    const validateCreateFields = [
        userID = req.body.userID,
        roomID = req.body.roomID,
        date = req.body.date
    ]

    router.get('/', async (req, res) => {
        const reserved = await reservationModel.find()
        res.status(200).send({ status: 'OK', data: reserved })
    })

    router.get('/one/:rid', async (req, res) => {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.rid)) {
                const reserved = await reservationModel.findById(req.params.rid)

                if (reserved === null) {
                    res.status(404).send({ status: 'ERR', data: 'No existe una reserva con ese ID' })
                } else {
                    res.status(200).send({ status: 'OK', data: reserved })
                }
            } else {
                res.status(400).send({ status: 'ERR', data: 'Formato de ID no válido' })
            }
        } catch (err) {
            res.status(500).send({ status: 'ERR', data: err.message })
        }
    }
    )

}
