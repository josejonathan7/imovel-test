import { database as Database } from "./config";


const initDb = {
	async init() {
		const db = await Database();

		await db.exec(`CREATE TABLE tb_movel (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			image TEXT,
			description TEXT,
			price TEXT,
			stock INTEGER
		)`);

		await db.exec(`CREATE TABLE tb_usuario (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			password TEXT,
			telephone TEXT,
			email TEXT,
			adress TEXT,
			admin INTEGER DEFAULT(0)
		)`);

		await db.close();
	}
};

export const User = {
	name: "",
	password: "",
	telephone: 0,
	email: "",
	adress: "",
	admin: false
};

initDb.init();
