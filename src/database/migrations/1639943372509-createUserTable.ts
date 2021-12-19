import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1639943372509 implements MigrationInterface {
	name = "createUserTable1639943372509";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("CREATE TABLE \"tb_usuario\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying(50) NOT NULL, \"password\" character varying(65) NOT NULL, \"telephone\" character varying(15) NOT NULL, \"email\" character varying NOT NULL, \"address\" character varying NOT NULL, \"admin\" boolean NOT NULL DEFAULT false, CONSTRAINT \"UQ_7d91b0f9d4692be9075a2f7c2f0\" UNIQUE (\"name\"), CONSTRAINT \"PK_fea85fa13fe26913a53d66a44db\" PRIMARY KEY (\"id\"))");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("DROP TABLE \"tb_usuario\"");
	}

}
