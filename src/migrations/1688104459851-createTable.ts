import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1688104459851 implements MigrationInterface {
    name = 'CreateTable1688104459851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "fipeDeal" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "fipeDeal"`);
    }

}
