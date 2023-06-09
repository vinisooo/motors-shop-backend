import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1686335486831 implements MigrationInterface {
    name = 'CreateTables1686335486831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" varchar PRIMARY KEY NOT NULL, "zipCode" varchar(8) NOT NULL, "state" varchar(2) NOT NULL, "city" varchar(25) NOT NULL, "street" varchar(40) NOT NULL, "number" varchar NOT NULL, "complement" varchar(128))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, "advertisementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "profileImg" varchar(127), "isAdvertiser" boolean NOT NULL, "description" text, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"))`);
        await queryRunner.query(`CREATE TABLE "gallery_advertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "coverImage" varchar(150) NOT NULL, "description" text, "isAvailable" boolean NOT NULL DEFAULT (1), "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, "advertisementId" varchar, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_889b53a3793fc35778644069dc7" FOREIGN KEY ("advertisementId") REFERENCES "advertisements" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "comment", "createdAt", "userId", "advertisementId") SELECT "id", "comment", "createdAt", "userId", "advertisementId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "profileImg" varchar(127), "isAdvertiser" boolean NOT NULL, "description" text, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "profileImg", "isAdvertiser", "description", "createdAt", "updatedAt", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "profileImg", "isAdvertiser", "description", "createdAt", "updatedAt", "addressId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_gallery_advertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar, CONSTRAINT "FK_be790747d3ddee3f2ef9d9bddf9" FOREIGN KEY ("advertisementId") REFERENCES "advertisements" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_gallery_advertisement"("id", "advertisementId") SELECT "id", "advertisementId" FROM "gallery_advertisement"`);
        await queryRunner.query(`DROP TABLE "gallery_advertisement"`);
        await queryRunner.query(`ALTER TABLE "temporary_gallery_advertisement" RENAME TO "gallery_advertisement"`);
        await queryRunner.query(`CREATE TABLE "temporary_advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "coverImage" varchar(150) NOT NULL, "description" text, "isAvailable" boolean NOT NULL DEFAULT (1), "userId" varchar, CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "coverImage", "description", "isAvailable", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "coverImage", "description", "isAvailable", "userId" FROM "advertisements"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`ALTER TABLE "temporary_advertisements" RENAME TO "advertisements"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" RENAME TO "temporary_advertisements"`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "coverImage" varchar(150) NOT NULL, "description" text, "isAvailable" boolean NOT NULL DEFAULT (1), "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "coverImage", "description", "isAvailable", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "coverImage", "description", "isAvailable", "userId" FROM "temporary_advertisements"`);
        await queryRunner.query(`DROP TABLE "temporary_advertisements"`);
        await queryRunner.query(`ALTER TABLE "gallery_advertisement" RENAME TO "temporary_gallery_advertisement"`);
        await queryRunner.query(`CREATE TABLE "gallery_advertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar)`);
        await queryRunner.query(`INSERT INTO "gallery_advertisement"("id", "advertisementId") SELECT "id", "advertisementId" FROM "temporary_gallery_advertisement"`);
        await queryRunner.query(`DROP TABLE "temporary_gallery_advertisement"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "profileImg" varchar(127), "isAdvertiser" boolean NOT NULL, "description" text, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "profileImg", "isAdvertiser", "description", "createdAt", "updatedAt", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "profileImg", "isAdvertiser", "description", "createdAt", "updatedAt", "addressId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, "advertisementId" varchar)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "comment", "createdAt", "userId", "advertisementId") SELECT "id", "comment", "createdAt", "userId", "advertisementId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`DROP TABLE "gallery_advertisement"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
