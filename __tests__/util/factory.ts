import factory from "factory-girl";
import faker from "faker";
import { UserEntity } from "../database/entities/userEntity";
import { getRepository } from "typeorm";
import { connection } from '../database/index'

const c = getRepository(UserEntity, "tests");

factory.define("User", c, {
	name: faker.name.findName(),
	password: "123456",
	telephone: faker.phone.phoneNumber(),
	email: faker.internet.email(),
	adress: faker.address.streetAddress(),
	admin: false
});

export default factory;
