import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("tb_usuario")
class UserEntity {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(){}

	@PrimaryGeneratedColumn("uuid")
		id!: string;

	@Column({
		unique: true,
		length: 50,
		type: "varchar"
	})
		name!: string;

	@Exclude()
	@Column({
		type: "varchar",
		length: 65
	})
		password!: string;

	@Column({
		type: "varchar",
		length: 15
	})
		telephone!: string;

	@Column( {
		type: "varchar"
	})
		email!: string;

	@Column({
		type: "varchar"
	})
		address!: string;

	@Column({
		type: "boolean",
		default: false
	})
		admin!: boolean;
}

export {UserEntity};
