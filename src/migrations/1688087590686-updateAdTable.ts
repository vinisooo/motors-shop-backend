import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdTable1688087590686 implements MigrationInterface {
    name = 'UpdateAdTable1688087590686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(25) NOT NULL, "street" character varying(40) NOT NULL, "number" character varying NOT NULL, "complement" character varying(128), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "advertisementId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(150) NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(18) NOT NULL, "birthdate" date NOT NULL, "profileImg" character varying(127), "isAdvertiser" boolean NOT NULL DEFAULT false, "description" text, "reset_password" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "galleryAdvertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" character varying NOT NULL, "advertisementId" uuid, CONSTRAINT "PK_a03ecb472502b8e7f12743dd302" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(60) NOT NULL, "model" character varying(120) NOT NULL, "year" integer NOT NULL, "fuel" character varying(20) NOT NULL, "color" character varying(20) NOT NULL, "quilometers" numeric(12,2) NOT NULL DEFAULT '0', "price" numeric(9,2) NOT NULL DEFAULT '0', "coverImage" character varying(150) NOT NULL, "description" text, "isAvailable" boolean NOT NULL DEFAULT true, "fipeDeal" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" uuid, CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_889b53a3793fc35778644069dc7" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleryAdvertisement" ADD CONSTRAINT "FK_8dd4865f12a90c0a186c6da4b45" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304"`);
        await queryRunner.query(`ALTER TABLE "galleryAdvertisement" DROP CONSTRAINT "FK_8dd4865f12a90c0a186c6da4b45"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_889b53a3793fc35778644069dc7"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`DROP TABLE "galleryAdvertisement"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
