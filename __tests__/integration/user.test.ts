import { describe, it, expect, afterEach } from "@jest/globals";
import faker from "faker";
import request from "supertest";
import { getCustomRepository } from "typeorm";
import app from "../../src/app";
import { UserRepositorie } from "../../src/repositories/userRepositorie";

describe("#Crud for user", () => {

	describe("#Create user", () => {

		/*afterEach(async () => {
			console.log(!getCustomRepository(UserRepositorie, "tests"));

			if(!getCustomRepository(UserRepositorie, "tests")){
				const userRepositorie =  getCustomRepository(UserRepositorie, "tests");

				const getUSer = await userRepositorie.find();

				if(!getUSer) {
					await userRepositorie.delete({});
				}
			}else {
				return;
			}

		});*/

		it("->Should not create user as empty data", async () => {
			const data = {
				name: faker.name.findName(),
				password: "",
				telephone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				address: faker.address.streetAddress()
			};

			const response = await request(app).post("/create/user").send(data);

			expect(response.status).toBe(400);
			expect(response.body.message).toBe("All information must be filled");
		});

		it("->Should create user register", async () => {
			const data = {
				name: faker.name.findName(),
				password: "123456",
				telephone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				address: faker.address.streetAddress()
			};

			const responseData = {
				name: data.name,
				telephone: data.telephone,
				email: data.email,
				address: data.address
			};

			const response = await request(app).post("/create/user").send(data);

			expect(response.status).toBe(200);
			expect(response.body).toMatchObject({data: responseData});
		});
	});
});

