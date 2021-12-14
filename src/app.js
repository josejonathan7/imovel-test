import express, { json } from "express";
import { routes } from "./routes";

class AppController {

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
