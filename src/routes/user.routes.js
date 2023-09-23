import mongoose from "mongoose";
import { Router } from 'express'

import userModel from '../models/user.models.js'

import { body, validationResult } from 'express-validator'
import { crateHash, isValidPassword, checkRequired, checkRoles, verifyTokens, filterData, filterAllowed } from '../utils.js'
import jwt from 'jsonwebtoken'

export const userRoutes = () => {
    const router = Router()

    const checkRequired = async (req, res, next) => {
        const userAlreadyRegistered = await userModel.findOne({ email: req.body.email })

        if (userAlreadyRegistered = await userModel.findOneI({ email: req.body.email }))
        
    }
}
