import { describe, it, expect, beforeAll, beforeEach } from "@jest/globals";
import faker from "faker";
import request from "supertest";
import app from "../../src/app";

describe("#Crud for user", () => {

	describe("#Create user", () => {

		it("->Should return status 200 ", async () => {
			const data = {
				name: faker.name.findName(),
				password: "123456",
				telephone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				adress: faker.address.streetAddress(),
				admin: false
			};

			const response = await request(app).post("/create/user").send(data);

			expect(response.status).toBe(200);
		});

		it("->Should not create user as empty data", async () => {
			const data = {
				name: faker.name.findName(),
				password: "",
				telephone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				adress: faker.address.streetAddress(),
				admin: false
			};

			const response = await request(app).post("/create/user").send(data);

			expect(response.status).toBe(400);
		});

		it.skip("->Should create user register", async () => {
			const data = {
				name: faker.name.findName(),
				password: "123456",
				telephone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				adress: faker.address.streetAddress()
			};

			const response = await request(app).post("/create/user").send(data);

			expect(response.body).toBe(
				expect.arrayContaining([
					expect.objectContaining({
						data
					})
				])
			);
		});
	});
});
