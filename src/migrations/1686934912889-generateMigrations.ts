import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateMigrations1686934912889 implements MigrationInterface {
    name = 'GenerateMigrations1686934912889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "updatedAt" date DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdvertiser" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdvertiser" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "createdAt"`);
    }

}
