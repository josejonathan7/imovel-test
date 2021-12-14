import { Database } from "sqlite3";
import { open } from "sqlite";

export const database = () =>
	open({
		filename: "./database.sqlite",
		driver: Database
	});

