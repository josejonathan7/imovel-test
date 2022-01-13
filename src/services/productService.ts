import { Connection, createConnection, getConnection, Like } from "typeorm";
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
	bedroom: string;
	livingRoom: string;
	kitchen: string;
	yard: string;
	bathroom: string;

	constructor() {
		dotenv.config({
			path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
		});

		this.connectionName = process.env.NODE_ENV === "test" ? "tests" : "default";
		this.connection = Promise.resolve(this.load()) as Promise<Connection>;

		this.bedroom = process.env.BEDROOM as string;
		this.livingRoom = process.env.LIVING_ROOM as string;
		this.kitchen = process.env.KITCHEN as string;
		this.yard = process.env.YARD as string;
		this.bathroom = process.env.BATHROOM as string;
	}

	async createProduct(data: ProductType) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const verifyExists = await productRepositorie.findOne({
			name: data.name
		});

		if(verifyExists) {
			throw new Error("This product is already registered");
		}

		const categoryId = data.category === "banheiro" ? this.bathroom : data.category ===  "cozinha" ? this.kitchen : data.category === "sala" ? this.livingRoom : data.category ===  "jardim" ? this.yard : this.bedroom;

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

		const categoryId = category === "banheiro" ? this.bathroom : category ===  "cozinha" ? this.kitchen : category === "sala" ? this.livingRoom : category ===  "jardim" ? this.yard : this.bedroom;

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

		const productList = await productRepositorie.find({
			order: {
				name: "ASC"
			}
		});

		if(productList.length === 0) {
			throw new Error("Not exists products registers");
		}

		return instanceToPlain(productList);
	}

	async getAllProductsByLike(search: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const findLike = await productRepositorie.find({
			where: {
				name: Like(`%${search}%`)
			},
			order: {
				name: "ASC"
			}
		});

		if(findLike.length === 0) {
			throw new Error("Not result by search");
		}

		return instanceToPlain(findLike);
	}

	async getProductByCategory(category: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const categoryId =  category === "banheiro" ? this.bathroom : category ===  "cozinha" ? this.kitchen : category === "sala" ? this.livingRoom : category ===  "jardim" ? this.yard : this.bedroom;

		const products = await productRepositorie.find({
			where: {
				category: {
					id: categoryId
				}
			},
			order: {
				name: "ASC"
			}
		});

		if(products.length === 0) {
			throw new Error("Not have products in the category search");
		}

		return instanceToPlain(products);

	}

	async getProductsByLikeCategory(search: string, category: string) {
		const productRepositorie = await this.connection.then(con => con.getCustomRepository(ProductRepositorie));

		const categoryId = category === "banheiro" ? this.bathroom : category ===  "cozinha" ? this.kitchen : category === "sala" ? this.livingRoom : category ===  "jardim" ? this.yard : this.bedroom;

		const findQueryCategory = await productRepositorie.find({
			where: {
				name: Like(`%${search}%`),
				category: {
					id: categoryId
				}
			},
			order: {
				name: "ASC"
			}
		});

		if(findQueryCategory.length === 0) {
			throw new Error("Not register in consult by category");
		}

		return instanceToPlain(findQueryCategory);
	}

	async load() {
		const connection: Connection = await createConnection(this.connectionName).then(con => con).catch(() => getConnection(this.connectionName));

		return connection;
	}
}
