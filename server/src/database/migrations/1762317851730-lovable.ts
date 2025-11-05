import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1762317851730 implements MigrationInterface {
    name = 'Lovable1762317851730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" ALTER COLUMN "toolMetadata" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" ALTER COLUMN "toolMetadata" SET NOT NULL`);
    }

}
