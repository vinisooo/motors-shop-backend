import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1686769608363 implements MigrationInterface {
    name = 'initialMigration1686769608363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_addresses" ("id" varchar PRIMARY KEY NOT NULL, "zipCode" varchar(8) NOT NULL, "state" varchar(2) NOT NULL, "city" varchar(25) NOT NULL, "street" varchar(40) NOT NULL, "number" varchar NOT NULL, "complement" varchar(128))`);
        await queryRunner.query(`INSERT INTO "temporary_addresses"("id", "zipCode", "state", "city", "street", "number", "complement") SELECT "id", "zip_code", "state", "city", "street", "number", "complement" FROM "addresses"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "temporary_addresses" RENAME TO "addresses"`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, "advertisementId" varchar, CONSTRAINT "FK_889b53a3793fc35778644069dc7" FOREIGN KEY ("advertisementId") REFERENCES "advertisements" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "comment", "createdAt", "userId", "advertisementId") SELECT "id", "comment", "created_at", "userId", "advertisementId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "galleryAdvertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "description" text, "addressId" varchar, CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "description" text, "userId" varchar, CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId" FROM "advertisements"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`ALTER TABLE "temporary_advertisements" RENAME TO "advertisements"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "description" text, "addressId" varchar, "profileImg" varchar(127), "isAdvertiser" boolean NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "description" text, "userId" varchar, "coverImage" varchar(150) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT (1), CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId" FROM "advertisements"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`ALTER TABLE "temporary_advertisements" RENAME TO "advertisements"`);
        await queryRunner.query(`CREATE TABLE "temporary_galleryAdvertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar, CONSTRAINT "FK_8dd4865f12a90c0a186c6da4b45" FOREIGN KEY ("advertisementId") REFERENCES "advertisements" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_galleryAdvertisement"("id", "advertisementId") SELECT "id", "advertisementId" FROM "galleryAdvertisement"`);
        await queryRunner.query(`DROP TABLE "galleryAdvertisement"`);
        await queryRunner.query(`ALTER TABLE "temporary_galleryAdvertisement" RENAME TO "galleryAdvertisement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleryAdvertisement" RENAME TO "temporary_galleryAdvertisement"`);
        await queryRunner.query(`CREATE TABLE "galleryAdvertisement" ("id" varchar PRIMARY KEY NOT NULL, "advertisementId" varchar)`);
        await queryRunner.query(`INSERT INTO "galleryAdvertisement"("id", "advertisementId") SELECT "id", "advertisementId" FROM "temporary_galleryAdvertisement"`);
        await queryRunner.query(`DROP TABLE "temporary_galleryAdvertisement"`);
        await queryRunner.query(`ALTER TABLE "advertisements" RENAME TO "temporary_advertisements"`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "description" text, "userId" varchar, CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId" FROM "temporary_advertisements"`);
        await queryRunner.query(`DROP TABLE "temporary_advertisements"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "description" text, "addressId" varchar, CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "advertisements" RENAME TO "temporary_advertisements"`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" varchar PRIMARY KEY NOT NULL, "brand" varchar(60) NOT NULL, "model" varchar(120) NOT NULL, "year" integer NOT NULL, "fuel" varchar(20) NOT NULL, "color" varchar(20) NOT NULL, "quilometers" decimal(6,2) NOT NULL DEFAULT (0), "price" decimal(9,2) NOT NULL DEFAULT (0), "cover_img" varchar(150) NOT NULL, "description" text, "is_available" boolean NOT NULL DEFAULT (1), "userId" varchar, CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "advertisements"("id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId") SELECT "id", "brand", "model", "year", "fuel", "color", "quilometers", "price", "description", "userId" FROM "temporary_advertisements"`);
        await queryRunner.query(`DROP TABLE "temporary_advertisements"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "password" varchar(150) NOT NULL, "cpf" varchar(11) NOT NULL, "phone" varchar(18) NOT NULL, "birthdate" date NOT NULL, "profile_img" varchar(127), "is_advertiser" boolean NOT NULL, "description" text, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "addressId" varchar, CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId") SELECT "id", "name", "email", "password", "cpf", "phone", "birthdate", "description", "addressId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "galleryAdvertisement"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, "advertisementId" varchar, CONSTRAINT "FK_889b53a3793fc35778644069dc7" FOREIGN KEY ("advertisementId") REFERENCES "advertisements" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "comment", "created_at", "userId", "advertisementId") SELECT "id", "comment", "createdAt", "userId", "advertisementId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME TO "temporary_addresses"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" varchar PRIMARY KEY NOT NULL, "zip_code" varchar(8) NOT NULL, "state" varchar(2) NOT NULL, "city" varchar(25) NOT NULL, "street" varchar(40) NOT NULL, "number" varchar NOT NULL, "complement" varchar(128))`);
        await queryRunner.query(`INSERT INTO "addresses"("id", "zip_code", "state", "city", "street", "number", "complement") SELECT "id", "zipCode", "state", "city", "street", "number", "complement" FROM "temporary_addresses"`);
        await queryRunner.query(`DROP TABLE "temporary_addresses"`);
    }

}
