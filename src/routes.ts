import {Router } from "express";

const routes = Router();

routes.get("/home", (req, res) => {

	res.status(200).send();
});

export { routes };
