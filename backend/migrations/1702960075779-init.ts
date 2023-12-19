import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702960075779 implements MigrationInterface {
    name = 'Init1702960075779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "comment" character varying NOT NULL, "author_id" integer NOT NULL, "reaction" character varying NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_comments_comments_id_enum" AS ENUM('40', '50')`);
        await queryRunner.query(`CREATE TABLE "users_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "comments_id" "public"."users_comments_comments_id_enum" NOT NULL, "user_id" uuid, "comment_id" uuid, CONSTRAINT "PK_86bdd51cd99741900baa293a80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL, "role" "public"."users_role_enum" NOT NULL, "karma" character varying NOT NULL, "avatar" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_posts_access_level_enum" AS ENUM('40', '50')`);
        await queryRunner.query(`CREATE TABLE "users_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "access_level" "public"."users_posts_access_level_enum" NOT NULL, "user_id" uuid, "post_id" uuid, CONSTRAINT "PK_ee95c825b5afdbd16191ffef951" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying NOT NULL, "status" integer NOT NULL, "catid" integer NOT NULL, CONSTRAINT "UQ_af95ddf25e9bd491236781b1aef" UNIQUE ("name"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL, "catid" integer NOT NULL, "category_id" uuid, "post_id" uuid, CONSTRAINT "PK_384901885f6184bc3af4be788d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "reaction"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "comment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "reaction" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_comments" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_posts" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "categories_posts" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_658c2a58b5e246d8d190feaaf40" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_66c2485ea21ba18f83d4dc69ebc" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_posts" ADD CONSTRAINT "FK_3ea461089306e96eb3b27775920" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_posts" ADD CONSTRAINT "FK_9bebddd5b3cfbe3c463a399775d" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_posts" ADD CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_posts" ADD CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_posts" DROP CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab"`);
        await queryRunner.query(`ALTER TABLE "categories_posts" DROP CONSTRAINT "FK_70980bcc3dc8718e5d580afc620"`);
        await queryRunner.query(`ALTER TABLE "users_posts" DROP CONSTRAINT "FK_9bebddd5b3cfbe3c463a399775d"`);
        await queryRunner.query(`ALTER TABLE "users_posts" DROP CONSTRAINT "FK_3ea461089306e96eb3b27775920"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_66c2485ea21ba18f83d4dc69ebc"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_658c2a58b5e246d8d190feaaf40"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories_posts" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_posts" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_comments" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "reaction"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "reaction" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "comment" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories_posts"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users_posts"`);
        await queryRunner.query(`DROP TYPE "public"."users_posts_access_level_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "users_comments"`);
        await queryRunner.query(`DROP TYPE "public"."users_comments_comments_id_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
