import { Connection, createConnection, getConnection } from "typeorm";
import dotenv from "dotenv";
import { instanceToPlain } from "class-transformer";
import { ProductRepositorie } from "../repositories/productRepositorie";

interface ProductType {
	name: string;
	image: string;
	description: string;
	price: number;
}

export class ProductService {
	connectionName: string;
	connection: Promise<Connection>;

	constructor() {
		dotenv.config();
		this.connectionName = process.env.NODE_ENV === "test" ? "tests" : "";
		this.connection = Promise.resolve(this.load()) as Promise<Connection>;
	}

	async createProduct(data: ProductType){
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const verifyExists = await productRepositorie.findOne({
			name: data.name
		});

		if(verifyExists) {
			throw new Error("This product is already registered");
		}

		const product = productRepositorie.create({
			...data,
			category: {
				name: "armario"
			}
		});

		const response = await productRepositorie.save(product);

		return instanceToPlain(response);
	}

	async load() {
		const connection: Connection = await createConnection(this.connectionName).then(con => con).catch(() => getConnection(this.connectionName));

		return connection;
	}
}
