import {Router } from "express";
import { UserController } from './controllers/userController'

const routes = Router();

routes.get("/home", (req, res) => {

	res.status(200).send();
});


routes.post("/create/user", UserController.createUser);

export { routes };
