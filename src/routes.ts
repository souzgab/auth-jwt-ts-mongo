import express from 'express'

import UserController from './controller/User.controller';

const routes = express.Router();


//Get
routes.get("/all", UserController.getAll)

//Post
routes.post("/signin", UserController.signin)
routes.post("/signup", UserController.signup)


export {routes};