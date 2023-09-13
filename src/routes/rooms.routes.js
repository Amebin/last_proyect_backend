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

    return router
}

