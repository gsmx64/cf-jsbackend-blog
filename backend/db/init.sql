-- CREATE DATABASE IF NOT EXISTS blogdb
SELECT 'CREATE DATABASE blogdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'blogdb')\gexec

DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
DROP TABLE IF EXISTS "public"."categories";
DROP TABLE IF EXISTS "public"."comments";
DROP TABLE IF EXISTS "public"."migrations";
DROP TABLE IF EXISTS "public"."posts";
DROP TABLE IF EXISTS "public"."settings";
DROP TABLE IF EXISTS "public"."users";
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1()";
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc()";
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3(namespace uuid, name text)";
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4()";
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5(namespace uuid, name text)";
DROP FUNCTION IF EXISTS "public"."uuid_nil()";
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns()";
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid()";
DROP FUNCTION IF EXISTS "public"."uuid_ns_url()";
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500()";
DROP TYPE IF EXISTS "public"."categories_status_enum";
DROP TYPE IF EXISTS "public"."posts_status_enum";
DROP TYPE IF EXISTS "public"."users_role_enum";
DROP TYPE IF EXISTS "public"."users_status_enum";
CREATE SEQUENCE "migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE TYPE "categories_status_enum" AS ENUM (
  'PUBLISHED',
  'UNPUBLISHED',
  'ARCHIVED',
  'TRASHED'
);
ALTER TYPE "categories_status_enum" OWNER TO "blogdbu";
CREATE TYPE "posts_status_enum" AS ENUM (
  'PUBLISHED',
  'UNPUBLISHED',
  'ARCHIVED',
  'TRASHED'
);
ALTER TYPE "posts_status_enum" OWNER TO "blogdbu";
CREATE TYPE "users_role_enum" AS ENUM (
  'NONE',
  'BASIC',
  'EDITOR',
  'MODERATOR',
  'ADMIN'
);
ALTER TYPE "users_role_enum" OWNER TO "blogdbu";
CREATE TYPE "users_status_enum" AS ENUM (
  'PENDING',
  'ENABLED',
  'BANNED'
);
ALTER TYPE "users_status_enum" OWNER TO "blogdbu";
CREATE TABLE "categories" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "title" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "image" text COLLATE "pg_catalog"."default" NOT NULL,
  "status" "public"."categories_status_enum" NOT NULL DEFAULT 'UNPUBLISHED'::categories_status_enum,
  "author_id" uuid
)
;
ALTER TABLE "categories" OWNER TO "blogdbu";
CREATE TABLE "comments" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "message" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "author_id" uuid,
  "post_id" uuid
)
;
ALTER TABLE "comments" OWNER TO "blogdbu";
CREATE TABLE "migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "timestamp" int8 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "migrations" OWNER TO "blogdbu";
CREATE TABLE "posts" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "title" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "image" text COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "status" "public"."posts_status_enum" NOT NULL DEFAULT 'UNPUBLISHED'::posts_status_enum,
  "author_id" uuid,
  "category_id" uuid
)
;
ALTER TABLE "posts" OWNER TO "blogdbu";
CREATE TABLE "settings" (
  "id" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "brand" varchar COLLATE "pg_catalog"."default",
  "facebook" varchar COLLATE "pg_catalog"."default",
  "instagram" varchar COLLATE "pg_catalog"."default",
  "twitterx" varchar COLLATE "pg_catalog"."default",
  "linkedin" varchar COLLATE "pg_catalog"."default",
  "youtube" varchar COLLATE "pg_catalog"."default",
  "tiktok" varchar COLLATE "pg_catalog"."default",
  "terms" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "settings" OWNER TO "blogdbu";
CREATE TABLE "users" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "username" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "status" "public"."users_status_enum" NOT NULL DEFAULT 'PENDING'::users_status_enum,
  "role" "public"."users_role_enum" NOT NULL DEFAULT 'BASIC'::users_role_enum,
  "karma" int4 NOT NULL,
  "avatar" text COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "age" int4 NOT NULL,
  "city" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "country" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "users" OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v1"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v1mc"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v3"("namespace" uuid, "name" text) OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v4"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v5"("namespace" uuid, "name" text) OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_nil"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_dns"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_oid"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_url"() OWNER TO "blogdbu";
CREATE OR REPLACE FUNCTION "uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_x500"() OWNER TO "blogdbu";

ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id");
ALTER TABLE "comments" ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id");
ALTER TABLE "migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");
ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id");
ALTER TABLE "settings" ADD CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id");
ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id");
ALTER TABLE "categories" ADD CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title");
ALTER TABLE "categories" ADD CONSTRAINT "FK_66378506bf59ebe3924f1f48b0e" FOREIGN KEY ("author_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "posts" ADD CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title");
ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username");
ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email");
ALTER SEQUENCE "migrations_id_seq"
OWNED BY "migrations"."id";
SELECT setval('"migrations_id_seq"', 3, true);
ALTER SEQUENCE "migrations_id_seq" OWNER TO "blogdbu";