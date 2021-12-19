import { EntityRepository, Repository } from "typeorm";
import { ProductEntity } from "../entitys/productEntity";

@EntityRepository(ProductEntity)
export class ProductRepositorie extends Repository<ProductEntity> {

}
