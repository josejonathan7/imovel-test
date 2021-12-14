import factory from "factory-girl";
import faker from "faker";
import { User } from "../../src/database/init";

factory.define("User", User, {
	name: faker.name.findName(),
	password: "123456",
	telephone: faker.phone.phoneNumber(),
	email: faker.internet.email(),
	adress: faker.address.streetAddress(),
	admin: false
});

export default factory;
