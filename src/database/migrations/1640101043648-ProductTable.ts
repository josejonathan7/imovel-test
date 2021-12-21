import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductTable1640101043648 implements MigrationInterface {
    name = 'ProductTable1640101043648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_produto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "categoryId" uuid, CONSTRAINT "PK_052efc8f2689d27567bc14dfac2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_categoria" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f376e9e975e75982e33b21f09e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_produto" ADD CONSTRAINT "FK_1e5ae716173a8b7b3fd74c6c94f" FOREIGN KEY ("categoryId") REFERENCES "tb_categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_produto" DROP CONSTRAINT "FK_1e5ae716173a8b7b3fd74c6c94f"`);
        await queryRunner.query(`DROP TABLE "tb_categoria"`);
        await queryRunner.query(`DROP TABLE "tb_produto"`);
    }

}
