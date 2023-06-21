import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1687317733402 implements MigrationInterface {
    name = 'CreateTable1687317733402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
    }

}
