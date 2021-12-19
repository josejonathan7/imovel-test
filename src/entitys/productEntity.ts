import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./categoryEntity";

@Entity("tb_produto")
class ProductEntity {


	@PrimaryGeneratedColumn("uuid")
		id!: string;

	@Column({
		type: "varchar",
		length: 40
	})
		name!: string;

	@Column()
		description!: string;

	@Column()
		image!: string;

	@Column()
		price!: number;

	@ManyToOne(type => CategoryEntity, products => ProductEntity, { eager: true })
		category!: CategoryEntity;

}

export {ProductEntity};
