import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entitys/userEntity";

@EntityRepository(UserEntity)
class UserRepositorie extends Repository<UserEntity>{

}

export {UserRepositorie};
