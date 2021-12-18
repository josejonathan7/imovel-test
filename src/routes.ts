import {Router } from "express";
import { UserController } from "./controllers/userController";

const routes = Router();
const userController = new UserController();


routes.get("/home", (req, res) => {

	res.status(200).send();
});

//user routes
routes.post("/create/user", userController.createUser);
routes.put("/update/user/:id", userController.updateUser);

export { routes };
