import { describe, it, expect, beforeAll, afterEach } from "@jest/globals";
import faker from "faker";
import { getCustomRepository } from "typeorm";
import { UserService } from "../../src/services/userService";
import { UserRepositorie } from "../../src/repositories/userRepositorie";

describe("#Test user unit functions", () => {
	let user: UserService;

	beforeAll(() => {
		user = new UserService();
	});

	afterEach(async () => {
		const userRepositorie =  getCustomRepository(UserRepositorie, "tests");

		await userRepositorie.delete({});
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

	it("->Should not create existing user", async () => {
		const data = {
			name: faker.name.findName(),
			password: "123456",
			telephone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
			address: faker.address.streetAddress()
		};

		await user.createUSer(data);

		try {
			await user.createUSer(data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {

			expect(error.message).toEqual("This user already exists");
		}
	});

	it("->Should update user", async () => {
		const data = {
			name: faker.name.findName(),
			email: faker.internet.email(),
			address: faker.address.streetAddress(),
			password: "123456",
			telephone: faker.phone.phoneNumber(),
			admin: false
		};

		const createUSer = await user.createUSer(data);

		const updateUSer = await user.updateUser({...data}, createUSer.id);

		expect(updateUSer).toBe(true);
	});

	it("->Should not update user with invalid Id", async () => {
		const data = {
			name: faker.name.findName(),
			email: faker.internet.email(),
			address: faker.address.streetAddress(),
			password: "123456",
			telephone: faker.phone.phoneNumber(),
			admin: false
		};

		await user.createUSer(data);

		try {

			await user.updateUser({...data}, "createUSer.id)");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toEqual("Not found a record to update");
		}
	});
});
