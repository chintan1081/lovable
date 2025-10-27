import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1761536350714 implements MigrationInterface {
    name = 'Lovable1761536350714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" ADD "toolMetadata" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" DROP COLUMN "toolMetadata"`);
    }

}
