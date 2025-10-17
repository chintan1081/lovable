import { MigrationInterface, QueryRunner } from "typeorm";

export class Lovable1760501339435 implements MigrationInterface {
    name = 'Lovable1760501339435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "lovable"."conversation_type_enum" AS ENUM('TOOL_CALL', 'TEXT_MESSAGE')`);
        await queryRunner.query(`CREATE TYPE "lovable"."conversation_messagefrom_enum" AS ENUM('USER', 'ASSISTANT')`);
        await queryRunner.query(`CREATE TYPE "lovable"."conversation_toolcall_enum" AS ENUM('READ_FILE', 'UPDATE_FILE', 'DELETE_FILE', 'WRITE_FILE')`);
        await queryRunner.query(`CREATE TABLE "lovable"."conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectId" uuid NOT NULL, "type" "lovable"."conversation_type_enum", "messageFrom" "lovable"."conversation_messagefrom_enum", "contents" character varying NOT NULL, "hidden" boolean NOT NULL DEFAULT false, "toolCall" "lovable"."conversation_toolcall_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lovable"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "initialPrompt" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lovable"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" ADD CONSTRAINT "FK_dd389587c03c80b36ac7f32c319" FOREIGN KEY ("projectId") REFERENCES "lovable"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lovable"."project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "lovable"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lovable"."project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "lovable"."conversation" DROP CONSTRAINT "FK_dd389587c03c80b36ac7f32c319"`);
        await queryRunner.query(`DROP TABLE "lovable"."users"`);
        await queryRunner.query(`DROP TABLE "lovable"."project"`);
        await queryRunner.query(`DROP TABLE "lovable"."conversation"`);
        await queryRunner.query(`DROP TYPE "lovable"."conversation_toolcall_enum"`);
        await queryRunner.query(`DROP TYPE "lovable"."conversation_messagefrom_enum"`);
        await queryRunner.query(`DROP TYPE "lovable"."conversation_type_enum"`);
    }

}
