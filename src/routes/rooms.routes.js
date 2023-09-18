import mongoose from 'mongoose'
import { Router } from 'express'

import roomModel from '../models/rooms.models.js'
import { avoidConsecutiveSpaces, isIsoDate, verifyToken, checkRoles, checkRequired } from '../middlewares/rooms.middleware.js'

import { body, validationResult } from 'express-validator'

export const roomsRoutes = ()  => {
    const router = Router()

    const validateCreateFields = [
        body('title').isLength({ min: 2, max: 32 }).withMessage('El título debe tener entre 2 y 32 caracteres'),
        body('price').isNumeric().withMessage('El precio debe ser numérico'),
        body('images').isArray({ min: 1, max: 100 }).withMessage('Debes proporcionar al menos una imagen'),
        body('description').isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres'),
        body('avaliableDates').isArray({ min: 1 }).withMessage('Debes proporcionar al menos una fecha disponible'),
        body('avaliableDates.*').custom(isIsoDate),
    ]    

    router.get('/', async (req, res) => {
        const rooms = await roomModel.find()
        res.status(200).send({ status: 'OK', data: rooms })
    })

    router.get('/one/:rid', async (req, res) => {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.rid)) {
                const room = await roomModel.findById(req.params.rid)

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

    router.post('/admin', verifyToken, checkRoles(['admin']), checkRequired(['title', 'price', 'avaliableDates']), avoidConsecutiveSpaces, validateCreateFields, async (req, res) => {
        if (validationResult(req).isEmpty()) {
            try {
                const { title, price, images, description, avaliableDates } = req.body
                const newRoom = { title, price, images, description, avaliableDates }

                const process = await roomModel.create(newRoom)
                
                res.status(201).send({ status: 'Created', data: process })
            } catch (err) {
                res.status(500).send({ status: 'ERR', data: err.message })
            }
        } else {
            res.status(400).send({ status: 'ERR', data: validationResult(req).array() })
        }
    })

    router.put('/admin/:rid', verifyToken, checkRoles(['admin']), avoidConsecutiveSpaces, validateCreateFields, async (req, res) => {
        try {
            const id = req.params.rid
            const updateData = req.body
    
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({ status: 'ERR', data: validationErrors.array() })
            }
    
            if (mongoose.Types.ObjectId.isValid(id)) {
                const roomToModify = await roomModel.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
    
                if (!roomToModify) {
                    res.status(404).send({ status: 'ERR', data: 'No existe habitación con ese ID' })
                } else {
                    res.status(200).send({ status: 'OK', data: roomToModify })
                }
            } else {
                res.status(400).send({ status: 'ERR', data: 'Formato de ID no válido' })
            }
        } catch (err) {
            res.status(500).send({ status: 'ERR', data: err.message })
        }
    })

    router.delete('/admin/:rid', verifyToken, checkRoles(['admin']), async (req, res) => {
        try {
            const id = req.params.rid
            if (mongoose.Types.ObjectId.isValid(id)) {
                const roomToDelete = await roomModel.findOneAndDelete({ _id: id })

                if (!roomToDelete) {
                    res.status(404).send({ status: 'ERR', data: 'No existe tarjeta con ese ID' })
                } else {
                    res.status(200).send({ status: 'OK', data: roomToDelete })
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

