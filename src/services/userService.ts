import { createConnection, Connection  } from "typeorm";
import { UserRepositorie } from "../repositories/userRepositorie";
import { instanceToPlain } from "class-transformer";
import dotenv from "dotenv";


interface userData {
	name: string;
	password: string;
	telephone: string;
	email: string;
	address: string;
	admin?: boolean;
}

class UserService {
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
			throw new Error("This user already exists");
		}

		return instanceToPlain(response);
	}

	async updateUser({ name, email, address, password, telephone, admin =false }: userData, id:string) {
		const userEntity = await this.connection.then(con => con.getCustomRepository(UserRepositorie));

		const updateUSer = await userEntity.update(id, {
			name,
			email,
			address,
			telephone,
			admin,
			password
		});

		const affected: number = updateUSer.affected ? updateUSer.affected : 0;

		if(affected === 0) {
			throw new Error("Not found a record to update");
		}

		return true;
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

export { UserService };
