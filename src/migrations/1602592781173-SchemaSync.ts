import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1602592781173 implements MigrationInterface {
    name = 'SchemaSync1602592781173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD "name" character varying NOT NULL`);
    }

}
