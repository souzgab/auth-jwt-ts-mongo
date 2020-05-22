import express from 'express'

import UserController from './controller/User.controller';

const routes = express.Router();


//Get


//Post
routes.post("/login", UserController.signin)
routes.post("/create", UserController.signup)


export {routes};