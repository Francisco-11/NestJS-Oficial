import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1602591966317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffee_entity" RENAME COLUMN "name" TO "title"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffee_entity" RENAME COLUMN "title" TO "name"`,
        );
    }

}
