import { getCustomRepository, createConnection, Connection  } from "typeorm";
import { UserRepositorie } from "../repositories/userRepositorie";
import { instanceToPlain } from "class-transformer";
import dotenv from "dotenv";


interface userData {
	name: string;
	password: string;
	telephone: string;
	email: string;
	address: string;
}

export class UserService {
	connectionName: string;
	connection: Promise<Connection>;

	constructor() {
		dotenv.config();
		this.connectionName = process.env.NODE_ENV === "test" ? "tests" : "default";
		this.connection = Promise.resolve(this.load()) as Promise<Connection>;
	}


	async createUSer(data: userData) {
		const userEntity = await this.connection.then(con => con.getCustomRepository(UserRepositorie));
		const createUserObject = userEntity.create(data);
		const response = await userEntity.save(createUserObject).catch(() => false);

		if(!response) {
			throw new Error("Bad create user");
		}

		return instanceToPlain(response);
	}

	async load() {
		try {
			const connection: Connection = await createConnection(this.connectionName);

			return connection;

		} catch (error) {
			console.log("deu ruim");
		}
	}
}
