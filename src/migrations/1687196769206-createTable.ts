import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1687196769206 implements MigrationInterface {
    name = 'CreateTable1687196769206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "quilometers" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "quilometers" TYPE numeric(6,2)`);
    }

}
