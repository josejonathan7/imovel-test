import { describe, it, expect, beforeAll } from "@jest/globals";
import request from "supertest";
import { getConnectionOptions, createConnection } from "typeorm";
import app from "../../src/app";
import factory from '../util/factory'

describe("#Crud for user", () => {

	beforeAll(async () => {
		await getConnectionOptions('test');
	})

	it("->should create user", async () => {
		const a = factory.create("USer");
		console.log(a)

		const response = await request(app).get("/home");

		expect(response.status).toBe(200);
	});
});
