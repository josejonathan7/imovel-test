import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import faker from "faker";
import { getCustomRepository } from "typeorm";
import { verify } from "jsonwebtoken";
import { UserService } from "../../src/services/userService";
import { UserRepositorie } from "../../src/repositories/userRepositorie";

describe("#Test user unit functions", () => {
	let user: UserService;
	let data: {
		name: string;
		password: string;
		telephone: string;
		email: string;
		address: string;
		admin?: boolean;
	};

	beforeAll(() => {
		user = new UserService();

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

	it("->Should create user", async () => {
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
		await user.createUSer(data);

		try {
			await user.createUSer(data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {

			expect(error.message).toEqual("User already exists");
		}
	});

	it("->Should update user", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		const createUSer = await user.createUSer(dataTest);

		const id = createUSer.id;

		const updateUSer = await user.updateUser({...dataTest}, id);

		expect(updateUSer).toBe(true);
	});

	it("->Should not update user with invalid Id", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		await user.createUSer(dataTest);

		try {

			await user.updateUser({...dataTest}, "createUSer.id)");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toEqual("Not found a record to update");
		}
	});

	it("->Should delete user", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		const createUSer = await user.createUSer(dataTest);

		const deleteUSer = await user.deleteUser(createUSer.id);

		expect(deleteUSer).toBe(true);
	});

	it("->Should not delete user with inexisting Id", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		await user.createUSer(dataTest);

		try {

			await user.deleteUser("1211e23w1ed23q1da2wd");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toEqual("Not found a record to delete");
		}
	});

	it("->Should get user data with JWT token ", async() => {
		const dataTest = {
			...data,
			admin: false
		};

		await user.createUSer(dataTest);

		const loginUSer = await user.login(dataTest.name, dataTest.password);

		const token = verify(loginUSer, `${process.env.SECRET_KEY}`);

		expect(token).toHaveProperty("id");

	});

	it("->Should not get user data with invalid login", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		await user.createUSer(dataTest);

		try {
			await user.login("data.name", dataTest.password);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Email/Password not found");
		}
	});

	it("->Should not get user data with invalid password", async () => {
		const dataTest = {
			...data,
			admin: false
		};

		await user.createUSer(dataTest);

		try {
			await user.login(dataTest.name, "data.password");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Email/Password not found");
		}
	});
});
