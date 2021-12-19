import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./productEntity";


@Entity("tb_categoria")
class CategoryEntity {

	@PrimaryGeneratedColumn("uuid")
		id!: string;

	@Column()
		name!: string;

	@OneToMany(type => ProductEntity, category => CategoryEntity)
		products!: ProductEntity[];

}

export {CategoryEntity};
