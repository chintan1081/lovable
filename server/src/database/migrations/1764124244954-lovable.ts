import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1764124244954 implements MigrationInterface {
    name = 'Lovable1764124244954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" ADD "projectId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" ADD CONSTRAINT "UQ_c0fca9f23c32ec60dcbfefefa9a" UNIQUE ("projectId")`);
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" ADD CONSTRAINT "FK_c0fca9f23c32ec60dcbfefefa9a" FOREIGN KEY ("projectId") REFERENCES "lovable"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" DROP CONSTRAINT "FK_c0fca9f23c32ec60dcbfefefa9a"`);
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" DROP CONSTRAINT "UQ_c0fca9f23c32ec60dcbfefefa9a"`);
        await queryRunner.query(`ALTER TABLE "lovable"."file_structure" DROP COLUMN "projectId"`);
    }

}
