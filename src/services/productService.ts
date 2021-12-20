import { Connection, createConnection, getConnection } from "typeorm";
import dotenv from "dotenv";
import { instanceToPlain } from "class-transformer";
import { ProductRepositorie } from "../repositories/productRepositorie";

interface ProductType {
	name: string;
	image: string;
	description: string;
	price: number;
	category: string;
}

export class ProductService {
	connectionName: string;
	connection: Promise<Connection>;
	wardrobe: string;
	bedroom: string;

	constructor() {
		dotenv.config({
			path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
		});

		this.connectionName = process.env.NODE_ENV === "test" ? "tests" : "";
		this.connection = Promise.resolve(this.load()) as Promise<Connection>;

		this.wardrobe = process.env.WARDROBE as string;
		this.bedroom = process.env.BEDROOM as string;
	}

	async createProduct(data: ProductType) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const verifyExists = await productRepositorie.findOne({
			name: data.name
		});

		if(verifyExists) {
			throw new Error("This product is already registered");
		}

		const categoryId = data.category === "armario" ? this.wardrobe : this.bedroom;

		const product = productRepositorie.create({
			...data,
			category: {
				id: categoryId
			}
		});

		const response = await productRepositorie.save(product);

		return instanceToPlain(response);
	}

	async updateProduct({ name, image, description, price, category}: ProductType, id: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const categoryId = category === "armario" ? this.wardrobe : this.bedroom;

		const updateProduct = await productRepositorie.update(id, {
			name,
			image,
			description,
			price,
			category: {
				id: categoryId
			}
		});

		const affected: number = updateProduct.affected ? updateProduct.affected : 0;

		if(affected === 0) {
			throw new Error("Not found a record to update");
		}

		return true;
	}

	async deleteProduct(id: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const deleteProduct = await productRepositorie.delete(id);

		const affected: number = deleteProduct.affected ? deleteProduct.affected : 0;

		if(affected === 0) {
			throw new Error("Not found register to delete");
		}

		return true;
	}

	async getAllProducts() {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const productList = await productRepositorie.find();

		if(!productList) {
			throw new Error("Not have products registers");
		}

		return instanceToPlain(productList);
	}

	async getProductByCategory(category: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const categoryId = category === "quarto" ? this.bedroom : category === "armario" ? this.wardrobe : "cozinha";

		const products = await productRepositorie.find({
			where: {
				category: {
					id: categoryId
				}
			}
		});

		if(!products) {
			throw new Error("Not have products in the category search");
		}

		return instanceToPlain(products);

	}

	async load() {
		const connection: Connection = await createConnection(this.connectionName).then(con => con).catch(() => getConnection(this.connectionName));

		return connection;
	}
}
