import {MigrationInterface, QueryRunner} from "typeorm";

export class User1639594050814 implements MigrationInterface {
    name = 'User1639594050814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "adress" varchar NOT NULL, "admin" boolean NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
    }

}
