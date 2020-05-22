import express from 'express'

import UserController from './controller/User.controller';

const routes = express.Router();

//Get
routes.post("/login", UserController.signin)

//Post
routes.post("/create", UserController.signup)


export {routes};