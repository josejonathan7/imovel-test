import { describe, it, expect, beforeAll } from "@jest/globals";
import faker from "faker";
import { UserService } from "../../src/services/userService";

describe("#Test user unit functions", () => {
	let user: UserService;

	beforeAll(() => {
		user = new UserService();
	});

	it("->Should create user", async () => {
		const data = {
			name: faker.name.findName(),
			password: "123456",
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};

		const response = {
			name: data.name,
			telephone: data.telephone,
			email: data.email,
			address: data.address
		};

		const createUSer = await user.createUSer(data);

		expect(createUSer).toMatchObject({...response});
	});

	it("-> Should not create a existent user", async () => {
		const data = {
			name: faker.name.findName(),
			password: "123456",
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};

		await user.createUSer(data);

		const createUSer = await user.createUSer(data);

		expect(createUSer).toThrow(Error);
	});
});
