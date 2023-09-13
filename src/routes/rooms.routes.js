import mongoose from 'mongoose'
import { Router } from 'express'

import roomModel from '../models/rooms.models.js'

import { body, validationResult } from 'express-validator'

export const roomsRoutes = ()  => {
    const router = Router()

    const validateCreateFields = [
        body('title').isLength({ min: 2, max: 32 }).withMessage('El título debe tener entre 2 y 32 caracteres'),
        body('price').isNumeric().withMessage('El precio debe ser numérico')
    ]

    router.get('/', async (req, res) => {
        const rooms = await roomModel.find()
        res.status(200).send({ status: 'OK', data: rooms })
    })

    router.get('/one/:cid', async (req, res) => {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.cid)) {
                const room = await roomModel.findById(req.params.cid)

                if (room === null) {
                    res.status(404).send({ status: 'ERR', data: 'No existe una habitacion con ese ID' })
                } else {
                    res.status(200).send({ status: 'OK', data: room })
                }
            } else {
                res.status(400).send({ status: 'ERR', data: 'Formato de ID no válido' })
            }
        } catch (err) {
            res.status(500).send({ status: 'ERR', data: err.message })
        }
    })

    

    return router
}

