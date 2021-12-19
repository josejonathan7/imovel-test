import { describe, it, expect, afterEach, afterAll, beforeAll } from "@jest/globals";
import faker from "faker";
import request from "supertest";
import { getCustomRepository} from "typeorm";
import app from "../../src/app";
import { UserRepositorie } from "../../src/repositories/userRepositorie";

describe("#Crud for user", () => {
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

	afterEach(async () => {
		const userRepositorie =  getCustomRepository(UserRepositorie, "tests");

		await userRepositorie.delete({});
	});

	it("->Should create user register", async () => {
		const responseData = {
			name: data.name,
			telephone: data.telephone,
			email: data.email,
			address: data.address
		};

		const response = await request(app).post("/create/user").send(data);

		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({data: responseData});
	});

	it("->Should not create user as empty data", async () => {
		const dataTest = {
			...data,
			password: ""
		};

		const response = await request(app).post("/create/user").send(dataTest);

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("All information must be filled");
	});

	it("->Should update user", async () => {
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

		const updatedUser = await request(app).put(`/update/user/${userData.id}`).send(updatedData);

		const status = updatedUser.status;

		expect(status).toBe(200);
	});

	it("->Should not update user with empty data", async () => {
		const dataTest = {
			...data,
			name: "",
			password: ""
		};

		await request(app).post("/create/user").send(dataTest);

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

	it("->Should delete existing user", async () => {
		const user = await request(app).post("/create/user").send(data);
		const userData = user.body.data;

		const deletedUser = await request(app).delete(`/delete/user/${userData.id}`);

		expect(deletedUser.status).toBe(200);
	});

	it("->Should not delete user with invalid Id", async () => {
		const deletedUser = await request(app).delete("/delete/user/dadasdasdasdasdasdsad");

		expect(deletedUser.status).toBe(400);
		expect(deletedUser.body.message).toBe("Id is obrigatory for operation");
	});

	it("->Should get user token with user data", async () => {

		await request(app).post("/create/user").send(data);

		const userData = await request(app).post("/user").send({
			name: data.name,
			password: data.password
		});

		expect(userData.status).toBe(200);
		expect(userData.body).toHaveProperty("token");
	});

	it("->Should not get user token with emptycredentials", async () => {
		await request(app).post("/create/user").send(data);

		const userData = await request(app).post("/user").send({
			name: data.name,
			password: ""
		});

		expect(userData.status).toBe(401);
		expect(userData.body.message).toBe("Name and password is binding");
	});
});

