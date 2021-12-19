import { createConnection, Connection, getConnection  } from "typeorm";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
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

		const verifyExistentUser = await userEntity.findOne({
			name: data.name
		});

		if(verifyExistentUser) {
			throw new Error("User already exists");
		}

		const passwordHash = await hash(data.password, 8);

		const createUserObject = userEntity.create({
			...data,
			password: passwordHash
		});

		const response = await userEntity.save(createUserObject);

		return instanceToPlain(response);
	}

	async updateUser({ name, email, address, password, telephone, admin =false }: userData, id:string) {
		const userRepositorie = await this.connection.then(con => con.getCustomRepository(UserRepositorie));
		const passwordHash= await hash(password, 8);
		const updatedUSer = await userRepositorie.update(id, {
			name,
			email,
			address,
			telephone,
			admin,
			password: passwordHash
		});

		const affected: number = updatedUSer.affected ? updatedUSer.affected : 0;

		if(affected === 0) {
			throw new Error("Not found a record to update");
		}

		return true;
	}

	async deleteUser(id: string){
		const userEntity = await this.connection.then(con => con.getCustomRepository(UserRepositorie));

		const deletedUSer = await userEntity.delete({id});
		const affected: number = deletedUSer.affected ? deletedUSer.affected : 0;

		if(affected === 0) {
			throw new Error("Not found a record to delete");
		}

		return true;
	}

	async login(name: string, password: string) {
		const userRepositorie = await this.connection.then(con => con.getCustomRepository(UserRepositorie));

		const user = await userRepositorie.findOne({
			name
		});

		if(!user) {
			throw new Error("Email/Password not found");
		}

		const passwordMatch = await compare(password, user.password);

		if(!passwordMatch){
			throw new Error("Email/Password not found");
		}

		const token = sign({
			id: user.id,
			email: user.email,
			admin: user.admin,
			name: user.name,
			telephone: user.telephone,
			address: user.address
		}, `${process.env.SECRET_KEY}`, {
			expiresIn: "2h"
		});

		return token;
	}

	async load() {
		const connection: Connection = await createConnection(this.connectionName).then(con => con).catch(()=> getConnection(this.connectionName));

		return connection;
	}
}

export { UserService };
