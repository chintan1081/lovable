import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1764123696335 implements MigrationInterface {
    name = 'Lovable1764123696335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lovable"."file_structure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "content" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56f008550f4db45615425073698" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lovable"."file_structure"`);
    }

}
