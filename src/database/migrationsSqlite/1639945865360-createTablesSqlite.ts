import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesSqlite1639945865360 implements MigrationInterface {
	name = "createTablesSqlite1639945865360";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("CREATE TABLE \"tb_produto\" (\"id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar(40) NOT NULL, \"description\" varchar NOT NULL, \"image\" varchar NOT NULL, \"price\" integer NOT NULL, \"categoryId\" varchar)");
		await queryRunner.query("CREATE TABLE \"tb_categoria\" (\"id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL)");
		await queryRunner.query("CREATE TABLE \"tb_usuario\" (\"id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar(50) NOT NULL, \"password\" varchar(65) NOT NULL, \"telephone\" varchar(15) NOT NULL, \"email\" varchar NOT NULL, \"address\" varchar NOT NULL, \"admin\" boolean NOT NULL DEFAULT (0), CONSTRAINT \"UQ_7d91b0f9d4692be9075a2f7c2f0\" UNIQUE (\"name\"))");
		await queryRunner.query("CREATE TABLE \"temporary_tb_produto\" (\"id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar(40) NOT NULL, \"description\" varchar NOT NULL, \"image\" varchar NOT NULL, \"price\" integer NOT NULL, \"categoryId\" varchar, CONSTRAINT \"FK_1e5ae716173a8b7b3fd74c6c94f\" FOREIGN KEY (\"categoryId\") REFERENCES \"tb_categoria\" (\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION)");
		await queryRunner.query("INSERT INTO \"temporary_tb_produto\"(\"id\", \"name\", \"description\", \"image\", \"price\", \"categoryId\") SELECT \"id\", \"name\", \"description\", \"image\", \"price\", \"categoryId\" FROM \"tb_produto\"");
		await queryRunner.query("DROP TABLE \"tb_produto\"");
		await queryRunner.query("ALTER TABLE \"temporary_tb_produto\" RENAME TO \"tb_produto\"");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("ALTER TABLE \"tb_produto\" RENAME TO \"temporary_tb_produto\"");
		await queryRunner.query("CREATE TABLE \"tb_produto\" (\"id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar(40) NOT NULL, \"description\" varchar NOT NULL, \"image\" varchar NOT NULL, \"price\" integer NOT NULL, \"categoryId\" varchar)");
		await queryRunner.query("INSERT INTO \"tb_produto\"(\"id\", \"name\", \"description\", \"image\", \"price\", \"categoryId\") SELECT \"id\", \"name\", \"description\", \"image\", \"price\", \"categoryId\" FROM \"temporary_tb_produto\"");
		await queryRunner.query("DROP TABLE \"temporary_tb_produto\"");
		await queryRunner.query("DROP TABLE \"tb_usuario\"");
		await queryRunner.query("DROP TABLE \"tb_categoria\"");
		await queryRunner.query("DROP TABLE \"tb_produto\"");
	}

}
