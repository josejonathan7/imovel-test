import { describe, it, expect, afterEach } from "@jest/globals";
import faker from "faker";
import request from "supertest";
import { getCustomRepository} from "typeorm";
import app from "../../src/app";
import { UserRepositorie } from "../../src/repositories/userRepositorie";

describe("#Crud for user", () => {

	afterEach(async () => {

		const userRepositorie =  getCustomRepository(UserRepositorie, "tests");

		await userRepositorie.delete({});
	});

	it("->Should create user register", async () => {
		const data = {
			name: faker.name.findName(),
			password: faker.internet.password(),
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

		const status = response.status;
		const body = response.body;

		expect(status).toBe(201);
		expect(body).toMatchObject({data: responseData});
	});

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

	it("->Should update user", async () => {
		const data = {
			name: faker.name.findName(),
			password: faker.internet.password(),
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};

		const user = await request(app).post("/create/user").send(data);

		const updatedData = {
			name: faker.name.findName(),
			password: faker.internet.password(),
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress(),
			admin: false
		};

		const userData = user.body.data;

		const updatedUSer = await request(app).put(`/update/user/${userData.id}`).send(updatedData);

		const status = updatedUSer.status;

		expect(status).toBe(200);
	});

	it("->Should not update user with empty data", async () => {
		const data = {
			name: faker.name.findName(),
			password: "",
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};

		await request(app).post("/create/user").send(data);

		const updatedData = {
			name: faker.name.findName(),
			password: faker.internet.password(),
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: "",
			admin: "asd"
		};

		const response = await request(app).put("/update/user/idmano").send(updatedData);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("All information must be filled");
	});
});

