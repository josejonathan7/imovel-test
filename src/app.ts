import express, { json } from "express";
import { Express } from "express-serve-static-core";
import { routes } from "./routes";
import "reflect-metadata";

class AppController {
	express: Express;

	constructor() {
		this.express = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.express.use(json());
	}

	routes() {
		this.express.use(routes);
	}
}

export default new AppController().express;
