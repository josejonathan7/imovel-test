import { describe, it, expect, afterEach, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import faker from "faker";
import { getCustomRepository } from "typeorm";
import app from "../../src/app";
import { ProductRepositorie } from "../../src/repositories/productRepositorie";

describe("#Crud for products", () => {
	let data: {
		name: string;
		image: string;
		description: string;
		price: number;
		category: string;
	};

	beforeAll(() => {
		data = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "cozinha"
		};
	});

	afterAll(() => {
		data= {
			name: "",
			image: "",
			price: 0,
			category: "",
			description: ""
		};
	});

	afterEach(async () => {
		const productRepositorie =  getCustomRepository(ProductRepositorie, "tests");

		await productRepositorie.delete({});
	});


	it("->Should create product", async () => {
		const product = await request(app).post("/create/product").send(data);

		expect(product.status).toBe(201);
		expect(product.body).toMatchObject({
			data: {
				...data,
				category: {}
			}
		});
	});

	it("->Should not create product with empty data", async () => {
		const productFake = {
			...data,
			name: ""
		};

		const createUser = await request(app).post("/create/product").send(productFake);

		expect(createUser.status).toBe(400);
		expect(createUser.body.message).toBe("All information must be filled");
	});

	it("->Should not create product with invalid category", async () => {
		const productFake = {
			...data,
			category: "quintal"
		};

		const createUser = await request(app).post("/create/product").send(productFake);

		expect(createUser.status).toBe(400);
		expect(createUser.body.message).toBe("Invalid product category");
	});

	it("->Should update product", async () => {
		const product = await request(app).post("/create/product").send(data);

		const id = product.body.data.id;

		const updatedData = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "quarto"
		};

		const updateProduct = await request(app).put(`/update/product/${id}`).send(updatedData);

		expect(updateProduct.status).toBe(200);
		expect(updateProduct.body).toBeTruthy();
	});

	it("->Should not update with empty data", async () => {
		const product = await request(app).post("/create/product").send(data);

		const id = product.body.data.id;

		const updatedData = {
			name: faker.commerce.productName(),
			image: "",
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "quarto"
		};

		const updateProduct = await request(app).put(`/update/product/${id}`).send(updatedData);

		expect(updateProduct.status).toBe(400);
		expect(updateProduct.body.message).toBe("All information must be filled");
	});

	it("->Should not update with invalid Id", async () => {
		const product = await request(app).post("/create/product").send(data);

		const id = product.body.data.id+"asdasd";

		const updatedData = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "quarto"
		};

		const updateProduct = await request(app).put(`/update/product/${id}`).send(updatedData);

		expect(updateProduct.status).toBe(400);
		expect(updateProduct.body.message).toBe("Id is obrigatory for operation");
	});

	it("->Should not update product with invalid category", async () => {
		const createUser = await request(app).post("/create/product").send(data);
		const id = createUser.body.data.id;

		const updatedData = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "garagem"
		};

		const updateProduct = await request(app).put(`/update/product/${id}`).send(updatedData);

		expect(updateProduct.status).toBe(400);
		expect(updateProduct.body.message).toBe("Invalid product category");
	});

	it("->Should delete product by id", async () => {
		const createUser = await request(app).post("/create/product").send(data);
		const id = createUser.body.data.id;

		const deletedProduct = await request(app).delete(`/delete/product/${id}`);

		expect(deletedProduct.status).toBe(200);
		expect(deletedProduct.body).toBeTruthy();
	});

	it("->Should not deleted product with invalid Id", async () => {
		const deletedProduct = await request(app).delete("/delete/product/asdsadasdasdasd");

		expect(deletedProduct.status).toBe(400);
		expect(deletedProduct.body.message).toBe("Id is obrigatory for operation");
	});

	it("->Should get all products",async () => {
		await request(app).post("/create/product").send(data);

		const dataTwo = {
			...data,
			name: faker.commerce.productName(),
			category: "quarto"
		};

		await request(app).post("/create/product").send(dataTwo);

		const dataThree = {
			...data,
			name: faker.commerce.productName(),
		};

		await request(app).post("/create/product").send(dataThree);

		const getProducts = await request(app).get("/products/");

		expect(getProducts.status).toBe(200);
		expect(getProducts.body.data).toHaveLength(3);
	});

	it("->Should get all product by like consult", async () => {
		await request(app).post("/create/product").send(data);

		const dataTwo = {
			...data,
			name: "Mega Stock",
			category: "quarto"
		};

		await request(app).post("/create/product").send(dataTwo);

		const getProducts = await request(app).get("/products/?search=sto");

		expect(getProducts.status).toBe(200);
		expect(getProducts.body.data[0]).toMatchObject({...dataTwo, category: {}});
	});

	it("->Should get product by category", async () => {
		await request(app).post("/create/product").send(data);

		const dataTwo = {
			...data,
			name: faker.commerce.productName(),
			category: "quarto"
		};

		await request(app).post("/create/product").send(dataTwo);

		const dataThree = {
			...data,
			name: faker.commerce.productName(),
		};

		await request(app).post("/create/product").send(dataThree);

		const productCategory = await request(app).get("/products/category/?category=quarto");

		expect(productCategory.status).toBe(200);
		expect(productCategory.body.data[0]).toMatchObject({...dataTwo, category: {}});
	});

	it("->Should get product by category with like consult", async () => {
		await request(app).post("/create/product").send(data);

		const dataTwo = {
			...data,
			name: faker.commerce.productName(),
			category: "quarto"
		};

		await request(app).post("/create/product").send(dataTwo);

		const dataThree = {
			...data,
			name: "mega stock"
		};

		await request(app).post("/create/product").send(dataThree);

		const productCategory = await request(app).get("/products/category/?category=cozinha&&search=ga");

		expect(productCategory.status).toBe(200);
		expect(productCategory.body.data[0]).toMatchObject({...dataThree, category: {}});
	});

	it("->Should not get product by category with invalid category", async () => {
		const getProduct = await request(app).get("/products/category/?category=garagem");

		expect(getProduct.status).toBe(400);
		expect(getProduct.body.message).toBe("Invalid product category");
	});
});
