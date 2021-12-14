import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../../src/app";
//import factory from "../util/factory";

describe("#Crud for user", () => {
	it("->Request Crete user route is status 200", async () => {
		const response = await request(app).get("/home");

		expect(response.status).toBe(200);
	});
});
