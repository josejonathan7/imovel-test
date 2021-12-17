import {Router } from "express";
import { UserController } from "./controllers/userController";

const routes = Router();
const userController = new UserController();


routes.get("/home", (req, res) => {

	res.status(200).send();
});


routes.post("/create/user", userController.createUser);

export { routes };
