import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tb_usuario")
class UserEntity {

	constructor(){}

	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	name!: string;

	@Column()
	password!: string;

	@Column()
	telephone!: string;

	@Column()
	email!: string;

	@Column()
	adress!: string;

	@Column()
	admin!: boolean;
}

export {UserEntity}
