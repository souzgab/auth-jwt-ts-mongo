import express, { Request, Response } from 'express'
import mongoose, { model } from 'mongoose'
import bcrypt from 'bcryptjs';
import gnt from '../validators/generateToken';
import { IUser } from '../models/User';
const requireDir = require('require-dir')
requireDir('../models');


const User = mongoose.model("User")

export default {
    async signin(req: Request, res: Response) {
        try {
            const user: IUser = await User.findOne({
                login: req.body.login,
            });

            if (!await bcrypt.compare(req.body.password, user.password)) {
                res.status(200).json({ message: `error logon`, error: 'Cannot found logon' })
            }
            const token: string = gnt.generateJwt({ id: user.id })
            user === null ?
                res.status(400).json({ message: `error logon`, error: 'Cannot found logon' }) :
                res.header('auth-token', token).status(200).json({ message: `success logon`, body: user, token: token })
        } catch (e) {
            return res.status(400).json({ message: `error login`, error: e })
        }
    },

    async signup(req: Request, res: Response) {
        try {
            const user: IUser = new User({
                name: req.body.name,
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
            })

            const createUser = await user.save()
            const token: string = gnt.generateJwt({ id: user.id })
            return res.header('auth-token', token).status(200).json({ message: `Success Register`, body: createUser, token: token });
        } catch (e) {
            return res.status(400).json({ message: `Signup Failed`, error: e })
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const createUser = await (await User.find()).length
            return res.status(200).json({message: `All Works`, SizeOfDataBase: `${createUser} Pessoas Cadastradas`})
        } catch (e) {
            return res.status(400).json({ message: `All Failed`, error: e })
        }
    }
}