import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1760755350839 implements MigrationInterface {
    name = 'Lovable1760755350839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."users" RENAME COLUMN "username" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."users" RENAME COLUMN "email" TO "username"`);
    }

}
