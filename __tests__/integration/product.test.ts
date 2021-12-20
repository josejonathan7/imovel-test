import { describe, it, expect, afterEach, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import faker from "faker";
import { getCustomRepository } from "typeorm";
import app from "../../src/app";
import { ProductRepositorie } from "../../src/repositories/productRepositorie";

describe("#Crud for products", () => {
	let data: {
		name: string;
		password: string;
		telephone: string;
		email: string;
		address: string;
		admin?: boolean;
	};

	beforeAll(() => {
		data = {
			name: faker.name.findName(),
			password: faker.internet.password(),
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};
	});

	afterAll(() => {
		data = {
			name: "",
			password: "",
			telephone: "",
			email: "",
			address: ""
		};
	});
	/*
	afterEach(async () => {
		const userRepositorie =  getCustomRepository(ProductRepositorie, "tests");

		await userRepositorie.delete({});
	});*/


	it("->Should create product route", async () => {
		const product = await request(app).post("/create/product").send(data);

		expect(product.status).toBe(200);
	});

});
