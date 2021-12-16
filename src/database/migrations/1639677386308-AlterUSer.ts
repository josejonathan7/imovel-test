import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUSer1639677386308 implements MigrationInterface {
    name = 'AlterUSer1639677386308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_usuario"("id", "name", "password", "telephone", "email", "admin") SELECT "id", "name", "password", "telephone", "email", "admin" FROM "tb_usuario"`);
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_usuario" RENAME TO "tb_usuario"`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "address" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_usuario"("id", "name", "password", "telephone", "email", "admin") SELECT "id", "name", "password", "telephone", "email", "admin" FROM "tb_usuario"`);
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_usuario" RENAME TO "tb_usuario"`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "password" varchar(40) NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "address" varchar NOT NULL, CONSTRAINT "UQ_11f9fce13c3ad024a78c6cb8794" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_tb_usuario"("id", "name", "password", "telephone", "email", "admin", "address") SELECT "id", "name", "password", "telephone", "email", "admin", "address" FROM "tb_usuario"`);
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_usuario" RENAME TO "tb_usuario"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_usuario" RENAME TO "temporary_tb_usuario"`);
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "address" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tb_usuario"("id", "name", "password", "telephone", "email", "admin", "address") SELECT "id", "name", "password", "telephone", "email", "admin", "address" FROM "temporary_tb_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_usuario"`);
        await queryRunner.query(`ALTER TABLE "tb_usuario" RENAME TO "temporary_tb_usuario"`);
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tb_usuario"("id", "name", "password", "telephone", "email", "admin") SELECT "id", "name", "password", "telephone", "email", "admin" FROM "temporary_tb_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_usuario"`);
        await queryRunner.query(`ALTER TABLE "tb_usuario" RENAME TO "temporary_tb_usuario"`);
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "telephone" varchar NOT NULL, "email" varchar NOT NULL, "adress" varchar NOT NULL, "admin" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tb_usuario"("id", "name", "password", "telephone", "email", "admin") SELECT "id", "name", "password", "telephone", "email", "admin" FROM "temporary_tb_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_usuario"`);
    }

}
