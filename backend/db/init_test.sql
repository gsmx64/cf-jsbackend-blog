/*
PostgreSQL Backup
Database: blogdb/public
Backup Time: 2024-05-10 20:00:49
*/

-- CREATE DATABASE IF NOT EXISTS blogdb
SELECT 'CREATE DATABASE blogdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'blogdb')\gexec

DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
DROP TABLE IF EXISTS "public"."categories";
DROP TABLE IF EXISTS "public"."comments";
DROP TABLE IF EXISTS "public"."migrations";
DROP TABLE IF EXISTS "public"."posts";
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
  "reaction" varchar COLLATE "pg_catalog"."default" NOT NULL,
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
ALTER FUNCTION "uuid_generate_v1"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v1mc"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v3"("namespace" uuid, "name" text) OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v4"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_generate_v5"("namespace" uuid, "name" text) OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_nil"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_dns"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_oid"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_url"() OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "uuid_ns_x500"() OWNER TO "postgres";
BEGIN;
LOCK TABLE "public"."categories" IN SHARE MODE;
DELETE FROM "public"."categories";
INSERT INTO "public"."categories" ("id","created_at","updated_at","title","description","image","status","author_id") VALUES ('117787a6-ae39-4dd0-ae7b-cea712b153ee', '2024-04-06 18:25:29.759575', '2024-04-06 18:25:29.759575', 'Default Category', 'Default Category description', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('3690e254-520c-4c2d-bbaf-9e941a42bf24', '2024-04-06 18:29:50.836759', '2024-04-06 18:29:50.836759', 'Default Category 2', 'Default Category description 2', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a');
COMMIT;
BEGIN;
LOCK TABLE "public"."comments" IN SHARE MODE;
DELETE FROM "public"."comments";
INSERT INTO "public"."comments" ("id","created_at","updated_at","message","reaction","author_id","post_id") VALUES ('da9e7077-66bb-46a2-b3b4-815d4c774bf0', '2024-04-06 18:52:29.866309', '2024-04-06 18:52:29.866309', 'Este es un mensaje de prueba 01', ':D', 'ce77df22-d5ee-423e-99ca-23d64287573a', NULL),('cd8f6015-1356-48d5-8298-69985cf8d259', '2024-04-06 18:52:34.615192', '2024-04-06 18:52:34.615192', 'Este es un mensaje de prueba 02', ':D', 'ce77df22-d5ee-423e-99ca-23d64287573a', NULL),('967a61b1-28ec-4d21-a158-a5c29d66dd4f', '2024-04-06 18:52:45.651306', '2024-04-06 18:52:45.651306', 'Este es un mensaje de prueba 03', ':D', 'ce77df22-d5ee-423e-99ca-23d64287573a', NULL);
COMMIT;
BEGIN;
LOCK TABLE "public"."migrations" IN SHARE MODE;
DELETE FROM "public"."migrations";
INSERT INTO "public"."migrations" ("id","timestamp","name") VALUES (1, 1712437270551, 'Initaltables1712437270551');
COMMIT;
BEGIN;
LOCK TABLE "public"."posts" IN SHARE MODE;
DELETE FROM "public"."posts";
INSERT INTO "public"."posts" ("id","created_at","updated_at","title","description","image","content","status","author_id","category_id") VALUES ('63cddf5d-7d14-4082-82ba-7b51660601d3', '2024-04-06 18:27:38.578155', '2024-04-06 18:27:38.578155', 'Prueba 02', 'Posteo de Prueba 02', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('af57f9cd-2823-481e-896c-4b989fbc43dc', '2024-04-06 18:27:44.302208', '2024-04-06 18:27:44.302208', 'Prueba 03', 'Posteo de Prueba 03', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('8543ded1-b41d-4486-9bcf-c6d8ffddd21c', '2024-04-06 18:27:53.16006', '2024-04-06 18:27:53.16006', 'Prueba 04', 'Posteo de Prueba 04', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('ce9942d3-bd03-4c48-851e-d14a7a172cfd', '2024-04-06 18:28:32.331285', '2024-04-06 18:28:32.331285', 'Prueba 05', 'Posteo de Prueba 05', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'ARCHIVED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('601bcfe7-9da5-4710-9e6c-10afc2dc814d', '2024-04-06 18:28:40.339796', '2024-04-06 18:28:40.339796', 'Prueba 06', 'Posteo de Prueba 06', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('a47db858-ee57-4f0e-9718-ca0deba0cb66', '2024-04-06 18:29:10.528326', '2024-04-06 18:29:10.528326', 'Prueba 11', 'Posteo de Prueba 11', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'ARCHIVED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('9d4640a2-45e5-4835-850a-c40a8f21e5ff', '2024-04-06 18:29:04.525233', '2024-04-06 18:29:04.525233', 'Prueba 10', 'Posteo de Prueba 10', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('164fc7c6-eb5d-462b-a0dc-e43bf2722ccc', '2024-04-06 18:28:53.671682', '2024-04-06 18:28:53.671682', 'Prueba 09', 'Posteo de Prueba 09', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('bbcbffbc-3952-42f6-b0ad-491c17518019', '2024-04-06 18:28:49.121455', '2024-04-06 18:28:49.121455', 'Prueba 08', 'Posteo de Prueba 08', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('eb579120-ec33-4dc8-bfe2-cf38f5ffb7b3', '2024-04-06 18:28:45.292262', '2024-04-06 18:28:45.292262', 'Prueba 07', 'Posteo de Prueba 07', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('cd524607-d326-4afe-8815-4f8796b4a8d0', '2024-04-06 18:27:31.194202', '2024-04-06 18:27:31.194202', 'Prueba 01', 'Posteo de Prueba 01', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('6c4c9ed1-6345-4ac7-a610-6edaccf614a7', '2024-04-06 18:29:15.675579', '2024-04-06 18:29:15.675579', 'Prueba 12', 'Posteo de Prueba 12', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24');
COMMIT;
BEGIN;
LOCK TABLE "public"."users" IN SHARE MODE;
DELETE FROM "public"."users";
INSERT INTO "public"."users" ("id","created_at","updated_at","username","email","password","status","role","karma","avatar","first_name","last_name","age","city","country") VALUES ('ce77df22-d5ee-423e-99ca-23d64287573a', '2024-04-06 18:02:11.476708', '2024-04-06 18:02:11.476708', 'Admin', 'admin@tester.com', '$2b$10$1mq/5Jde2UiPXkuXwgm4OeH2KB6LEyGfAbfbnypY6HMsQVM7.8lJe', 'ENABLED', 'ADMIN', 0, 'image.jpg', 'Admin', 'Tester', 40, 'Cordoba', 'Argentina'),('2573cba1-0b88-410c-9c5a-c137068e76c7', '2024-04-06 18:03:30.661969', '2024-04-06 18:03:30.661969', 'Tester2', 'tester2@tester.com', '$2b$10$XgrCByphPpDb3hXg94LmJ.d58vLATMddFlSFjE8CYs1uFwlJE4aqu', 'ENABLED', 'BASIC', 0, 'image.jpg', 'Tester2', 'Tester2', 35, 'Mendoza', 'Argentina'),('b0a5bd7f-0636-474b-b4ce-dc034dbbb586', '2024-04-06 18:03:03.43559', '2024-04-06 18:03:03.43559', 'Tester1', 'tester1@tester.com', '$2b$10$YGdaRKSV.n4WsAZ8OaBRLunci8KCCY/LdvTA9mh/PuHSnhR.hvBgu', 'ENABLED', 'MODERATOR', 0, 'image.jpg', 'Tester1', 'Tester1', 29, 'Salta', 'Argentina'),('22d4a576-c334-4e14-bdce-96fe62552198', '2024-05-07 18:09:14.67934', '2024-05-07 18:09:14.67934', 'Tester3', 'tester3@tester.com', '$2b$10$Cxh3Q3S8PaQKPAtlEapUsu.epZHIISWYGav99PZWiR4H2fKFpKs8e', 'PENDING', 'BASIC', 0, '', 'Tester3', 'Tester3', 33, 'San Luis', 'Argentina'),('20a8f0bd-4ec0-48a2-b41f-d1badb3dac9a', '2024-05-07 18:31:50.224432', '2024-05-07 18:31:50.224432', 'Tester4', 'tester4@tester.com', '$2b$10$Ui1uWUAmSFnK7jWFEssbhei8ZZuS0xcZ4k2DdDHNGqn7SWBmkHTja', 'PENDING', 'BASIC', 0, '', 'Tester4', 'Tester4', 34, 'San Luis', 'Argentina');
COMMIT;
ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id");
ALTER TABLE "comments" ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id");
ALTER TABLE "migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");
ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id");
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
SELECT setval('"migrations_id_seq"', 1, true);
ALTER SEQUENCE "migrations_id_seq" OWNER TO "blogdbu";
