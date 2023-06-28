import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResetPassword1687532345059 implements MigrationInterface {
    name = 'CreateResetPassword1687532345059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
    }

}
