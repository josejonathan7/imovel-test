import { describe, it, expect, beforeAll } from "@jest/globals";
import faker from "faker";
import { ProductService } from "../../src/services/productService";

describe("#Test product unit functions", () => {
	let product: ProductService;
	let data: {
		name: string;
		image: string;
		description: string;
		price: number;
	};

	beforeAll(() => {
		product = new ProductService();

		data = {
			name: faker.commerce.productName(),
			image: faker.image.transport(),
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price())
		};
	});

	it("-> call", async () => {

		const ok = await product.createProduct(data);
		expect(ok).toBe(true);
	});
});
