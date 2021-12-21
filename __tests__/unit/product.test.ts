import { describe, it, expect, beforeAll, afterEach } from "@jest/globals";
import faker from "faker";
import { getCustomRepository } from "typeorm";
import { ProductRepositorie } from "../../src/repositories/productRepositorie";
import { ProductService } from "../../src/services/productService";

describe("#Test product unit functions", () => {
	let product: ProductService;
	let data: {
		name: string;
		image: string;
		description: string;
		price: number;
		category: string;
	};

	beforeAll(() => {
		product = new ProductService();

		data = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "jardim"
		};
	});

	afterEach(async () => {
		const productRepositorie = getCustomRepository(ProductRepositorie, "tests");

		await productRepositorie.delete({});
	});

	it("->Should create product", async () => {
		const createProduct = await product.createProduct(data);

		expect(createProduct).toMatchObject({
			...data,
			category: {
			}
		});
	});

	it("->Should not create existent product", async () => {
		await product.createProduct(data);

		try {
			await product.createProduct(data);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("This product is already registered");
		}
	});

	it("->Should update product", async () => {
		const createProduct = await product.createProduct(data);
		const id = createProduct.id;

		const updatedData = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "quarto"
		};

		const updateProduct = await product.updateProduct({...updatedData}, id);

		expect(updateProduct).toBeTruthy();
	});

	it("->Should not update product with invalid Id", async () => {
		await product.createProduct(data);

		const updatedData = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			category: "quarto"
		};



		try {
			await product.updateProduct({...updatedData}, "id");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not found a record to update");
		}
	});

	it("->Should delete product", async () => {
		const createProduct = await product.createProduct({...data});

		const id = createProduct.id;

		const deleteProduct = await product.deleteProduct(id);

		expect(deleteProduct).toBeTruthy();
	});

	it("->Should not delete with invalid Id", async () => {
		await product.createProduct({...data});

		try {
			await product.deleteProduct("id");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not found register to delete");
		}
	});

	it("->Should list all products", async () => {
		await product.createProduct(data);

		const productTwo = {
			...data,
			name: faker.commerce.productName()
		};

		await product.createProduct(productTwo);

		const productThree = {
			...data,
			name: faker.commerce.productName()
		};

		await product.createProduct(productThree);

		const listProducts = await product.getAllProducts();

		expect(listProducts).toHaveLength(3);
	});

	it("->Should return error message with not have products to list", async() => {
		try {
			await product.getAllProducts();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not exists products registers");
		}
	});

	it("->Should get all products where category is defined", async () => {
		await product.createProduct(data);

		const productTwo = {
			...data,
			name: faker.commerce.productName(),
			category: "quarto"
		};

		await product.createProduct(productTwo);

		const getProductByCategoryResponse = await product.getProductByCategory("jardim");

		expect(getProductByCategoryResponse[0]).toMatchObject({
			...data,
			category: {
				name: "jardim"
			}
		});
	});

	it("->Should not get products where category is invalid", async () => {
		try {
			await product.getProductByCategory("quarto");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not have products in the category search");
		}
	});

	it("->Should get product by search query", async() => {
		await product.createProduct(data);

		const productTwo = {
			...data,
			name: "geladao",
			category: "quarto"
		};

		await product.createProduct(productTwo);

		const products = await product.getAllProductsByLike("la");

		expect(products).toMatchObject([{...productTwo, category: {}}]);
	});

	it("->Should not get product inexistent in Like query", async () => {
		try {
			await product.getAllProductsByLike("la");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not result by search");
		}
	});

	it("->Should get product by search query category", async() => {
		await product.createProduct(data);

		const productTwo = {
			...data,
			name: "geladao",
			category: "quarto"
		};

		await product.createProduct(productTwo);

		const products = await product.getProductsByLikeCategory("lad", "quarto");

		expect(products).toMatchObject([{...productTwo, category: {
			name: "quarto"
		}}]);
	});

	it("->Should not get product inexistent in Like query category", async () => {
		try {
			await product.getProductsByLikeCategory("ladasdasd", "quarto");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Not register in consult by category");
		}
	});
});
