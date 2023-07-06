import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1688649020961 implements MigrationInterface {
    name = 'Migrations1688649020961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleryAdvertisement" ADD "imageUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "fipeDeal" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "fipeDeal"`);
        await queryRunner.query(`ALTER TABLE "galleryAdvertisement" DROP COLUMN "imageUrl"`);
    }

}
