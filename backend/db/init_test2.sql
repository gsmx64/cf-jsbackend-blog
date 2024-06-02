/*
PostgreSQL Backup
Database: blogdb/public
Backup Time: 2024-05-25 14:34:07
*/

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
  "tiktok" varchar COLLATE "pg_catalog"."default"
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
INSERT INTO "public"."categories" ("id","created_at","updated_at","title","description","image","status","author_id") VALUES ('3690e254-520c-4c2d-bbaf-9e941a42bf24', '2024-04-06 18:29:50.836759', '2024-04-06 18:29:50.836759', 'Default Category 2', 'Default Category description 2', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('0062df53-ba89-4d36-8521-d18dd75dbeaf', '2024-05-22 22:40:48.28474', '2024-05-22 22:40:48.28474', 'Default Category 3e', 'Default Category description 3e', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('7410e256-c1c4-49f1-b301-3af935d001ad', '2024-05-23 00:13:09.209516', '2024-05-23 00:13:09.209516', 'Default Category 3f', 'Default Category description 3f', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('42a7e7ef-6924-4849-b00b-d784dba6c028', '2024-05-23 00:14:05.779268', '2024-05-23 00:14:05.779268', 'Default Category 3g', 'Default Category description 3g', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('c415cd28-e27f-43eb-831a-38093295a2bb', '2024-05-22 21:37:47.904607', '2024-05-22 21:37:47.904607', 'Default Category 3b', 'Default Category description 3b', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('641b7b50-f563-4089-a785-8a2329b0fb47', '2024-05-22 22:32:11.099991', '2024-05-22 22:32:11.099991', 'Default Category 3c', 'Default Category description 3c', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('dfa9805a-b9f1-4411-8056-c649761abd77', '2024-05-22 22:32:43.073806', '2024-05-22 22:32:43.073806', 'Default Category 3d', 'Default Category description 3d', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('117787a6-ae39-4dd0-ae7b-cea712b153ee', '2024-04-06 18:25:29.759575', '2024-04-06 18:25:29.759575', 'Default Category', 'Default Category description', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('82c91c87-b248-4491-a295-436bb1850ea5', '2024-05-23 00:23:54.17399', '2024-05-23 00:23:54.17399', 'Categoria 4', 'Descripcion cat 4', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('e5ad8378-1023-4446-9323-3a4ca6d6cca3', '2024-05-22 14:22:42.701459', '2024-05-22 14:22:42.701459', 'Default Category 3', 'Default Category description 3', 'https://getlorem.com/static/images/cicero2.jpg', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a'),('9071eef8-3161-4620-b86a-761b41b9d975', '2024-05-22 21:33:37.931779', '2024-05-23 01:29:56.877075', 'Default Category 3a', 'Default Category description 3a', 'https://getlorem.com/static/images/cicero2.jpg', 'UNPUBLISHED', '20a8f0bd-4ec0-48a2-b41f-d1badb3dac9a');
COMMIT;
BEGIN;
LOCK TABLE "public"."comments" IN SHARE MODE;
DELETE FROM "public"."comments";
INSERT INTO "public"."comments" ("id","created_at","updated_at","message","author_id","post_id") VALUES ('979e1eab-bad3-4985-af20-59838ad00955', '2024-05-23 18:04:54.271768', '2024-05-23 18:04:54.271768', 'Este es un mensaje de prueba 04', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('aa4f05a3-a78e-428e-961c-64bd02fe64dd', '2024-05-23 18:05:11.103146', '2024-05-23 18:05:11.103146', 'Este es un mensaje de prueba!!!', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('4227921a-4d7a-43a6-899b-f3c9e6dc165b', '2024-05-23 18:07:09.106282', '2024-05-23 18:07:09.106282', 'Este es un mensaje de prueba 2!!!', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('fa3bfcae-97da-401b-9f32-cf76cb2bad9f', '2024-05-23 18:23:48.755958', '2024-05-23 18:23:48.755958', 'sdfdsfdsf', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('e2dacc7c-8c9c-4665-9a04-c0f6b2024478', '2024-05-23 21:49:49.110954', '2024-05-23 21:49:49.110954', 'Prueba *********', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('2f0d4673-0ee3-4566-ba74-8aac48667561', '2024-05-23 21:51:49.263425', '2024-05-23 21:51:49.263425', 'fdfdsfdsfds', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('b5874372-e167-4ee2-96ce-aed345bc0232', '2024-05-23 21:53:03.543158', '2024-05-23 21:53:03.543158', 'ffghddfgf3 4543523', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('93807bd4-8c7a-41bd-b522-4dc3bc277695', '2024-05-23 21:54:18.176287', '2024-05-23 21:54:18.176287', 'ffghddfgf3 4543523', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75'),('967a61b1-28ec-4d21-a158-a5c29d66dd4f', '2024-04-06 18:52:45.651306', '2024-04-06 18:52:45.651306', 'Este es un mensaje de prueba 03', '20a8f0bd-4ec0-48a2-b41f-d1badb3dac9a', '63cddf5d-7d14-4082-82ba-7b51660601d3'),('cd8f6015-1356-48d5-8298-69985cf8d259', '2024-04-06 18:52:34.615192', '2024-04-06 18:52:34.615192', 'Este es un mensaje de prueba 02', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'af57f9cd-2823-481e-896c-4b989fbc43dc'),('da9e7077-66bb-46a2-b3b4-815d4c774bf0', '2024-04-06 18:52:29.866309', '2024-04-06 18:52:29.866309', 'Este es un mensaje de prueba 01', 'ce77df22-d5ee-423e-99ca-23d64287573a', '63cddf5d-7d14-4082-82ba-7b51660601d3'),('e37cd4be-8d47-42c8-80d1-58ec182297c1', '2024-05-25 14:32:45.238888', '2024-05-25 14:32:45.238888', 'Mensaje de prueba nuevo', 'ce77df22-d5ee-423e-99ca-23d64287573a', 'bc78c13a-6eac-4950-a853-2ceb2ed32d75');
COMMIT;
BEGIN;
LOCK TABLE "public"."migrations" IN SHARE MODE;
DELETE FROM "public"."migrations";
INSERT INTO "public"."migrations" ("id","timestamp","name") VALUES (1, 1712437270551, 'Initaltables1712437270551'),(2, 1716531336060, 'Initaltables1716531336060'),(3, 1716530080921, 'Initaltables1716530080921');
COMMIT;
BEGIN;
LOCK TABLE "public"."posts" IN SHARE MODE;
DELETE FROM "public"."posts";
INSERT INTO "public"."posts" ("id","created_at","updated_at","title","description","image","content","status","author_id","category_id") VALUES ('63cddf5d-7d14-4082-82ba-7b51660601d3', '2024-04-06 18:27:38.578155', '2024-04-06 18:27:38.578155', 'Prueba 02', 'Posteo de Prueba 02', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('af57f9cd-2823-481e-896c-4b989fbc43dc', '2024-04-06 18:27:44.302208', '2024-04-06 18:27:44.302208', 'Prueba 03', 'Posteo de Prueba 03', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('8543ded1-b41d-4486-9bcf-c6d8ffddd21c', '2024-04-06 18:27:53.16006', '2024-04-06 18:27:53.16006', 'Prueba 04', 'Posteo de Prueba 04', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('ce9942d3-bd03-4c48-851e-d14a7a172cfd', '2024-04-06 18:28:32.331285', '2024-04-06 18:28:32.331285', 'Prueba 05', 'Posteo de Prueba 05', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'ARCHIVED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('601bcfe7-9da5-4710-9e6c-10afc2dc814d', '2024-04-06 18:28:40.339796', '2024-04-06 18:28:40.339796', 'Prueba 06', 'Posteo de Prueba 06', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('a47db858-ee57-4f0e-9718-ca0deba0cb66', '2024-04-06 18:29:10.528326', '2024-04-06 18:29:10.528326', 'Prueba 11', 'Posteo de Prueba 11', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'ARCHIVED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('9d4640a2-45e5-4835-850a-c40a8f21e5ff', '2024-04-06 18:29:04.525233', '2024-04-06 18:29:04.525233', 'Prueba 10', 'Posteo de Prueba 10', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('164fc7c6-eb5d-462b-a0dc-e43bf2722ccc', '2024-04-06 18:28:53.671682', '2024-04-06 18:28:53.671682', 'Prueba 09', 'Posteo de Prueba 09', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('bbcbffbc-3952-42f6-b0ad-491c17518019', '2024-04-06 18:28:49.121455', '2024-04-06 18:28:49.121455', 'Prueba 08', 'Posteo de Prueba 08', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('eb579120-ec33-4dc8-bfe2-cf38f5ffb7b3', '2024-04-06 18:28:45.292262', '2024-04-06 18:28:45.292262', 'Prueba 07', 'Posteo de Prueba 07', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '3690e254-520c-4c2d-bbaf-9e941a42bf24'),('6c4c9ed1-6345-4ac7-a610-6edaccf614a7', '2024-04-06 18:29:15.675579', '2024-04-06 18:29:15.675579', 'Prueba 12', 'Posteo de Prueba 12', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'UNPUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('cd524607-d326-4afe-8815-4f8796b4a8d0', '2024-04-06 18:27:31.194202', '2024-04-06 18:27:31.194202', 'Prueba 01', 'Posteo de Prueba 01', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '117787a6-ae39-4dd0-ae7b-cea712b153ee'),('bc78c13a-6eac-4950-a853-2ceb2ed32d75', '2024-05-23 01:42:01.104833', '2024-05-23 01:42:06.551015', 'Post prueba A', 'Descripcion de prueba A', 'https://getlorem.com/static/images/cicero2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.', 'PUBLISHED', 'ce77df22-d5ee-423e-99ca-23d64287573a', '82c91c87-b248-4491-a295-436bb1850ea5');
COMMIT;
BEGIN;
LOCK TABLE "public"."settings" IN SHARE MODE;
DELETE FROM "public"."settings";
INSERT INTO "public"."settings" ("id","updated_at","brand","facebook","instagram","twitterx","linkedin","youtube","tiktok") VALUES ('1', '2024-05-25 12:47:31.369218', 'MyBlog', 'https://www.facebook.com/MyBlog', 'https://www.instagram.com/MyBlog', 'https://www.x.com/MyBlog', 'https://www.linkedin.com/in/MyBlog', ' https://www.youtube.com/@MyBlog', 'https://www.tiktok.com/@MyBlog');
COMMIT;
BEGIN;
LOCK TABLE "public"."users" IN SHARE MODE;
DELETE FROM "public"."users";
INSERT INTO "public"."users" ("id","created_at","updated_at","username","email","password","status","role","karma","avatar","first_name","last_name","age","city","country") VALUES ('b0a5bd7f-0636-474b-b4ce-dc034dbbb586', '2024-04-06 18:03:03.43559', '2024-04-06 18:03:03.43559', 'Tester1', 'tester1@tester.com', '$2b$10$YGdaRKSV.n4WsAZ8OaBRLunci8KCCY/LdvTA9mh/PuHSnhR.hvBgu', 'ENABLED', 'MODERATOR', 0, '', 'Tester1', 'Tester1', 29, 'Salta', 'Argentina'),('20a8f0bd-4ec0-48a2-b41f-d1badb3dac9a', '2024-05-07 18:31:50.224432', '2024-05-20 23:25:25.387336', 'Tester4', 'tester4@tester.com', '$2b$10$Ui1uWUAmSFnK7jWFEssbhei8ZZuS0xcZ4k2DdDHNGqn7SWBmkHTja', 'PENDING', 'MODERATOR', 0, '', 'Tester4', 'Tester4b', 32, 'Chubut', 'Argentina'),('ce77df22-d5ee-423e-99ca-23d64287573a', '2024-04-06 18:02:11.476708', '2024-05-21 00:04:04.447413', 'Admin', 'admin@tester.com', '$2b$10$Ui1uWUAmSFnK7jWFEssbhei8ZZuS0xcZ4k2DdDHNGqn7SWBmkHTja', 'ENABLED', 'ADMIN', 0, '', 'Admin', 'Tester', 42, 'Córdoba', 'Argentina'),('22d4a576-c334-4e14-bdce-96fe62552198', '2024-05-07 18:09:14.67934', '2024-05-21 12:25:14.641108', 'Tester3', 'tester3@tester.com', '$2b$10$Cxh3Q3S8PaQKPAtlEapUsu.epZHIISWYGav99PZWiR4H2fKFpKs8e', 'BANNED', 'BASIC', 0, '', 'Tester3', 'Tester3', 33, 'San Luis', 'Argentina'),('2573cba1-0b88-410c-9c5a-c137068e76c7', '2024-04-06 18:03:30.661969', '2024-05-20 23:13:33.781973', 'Tester2', 'tester2@tester.com', '$2b$10$XgrCByphPpDb3hXg94LmJ.d58vLATMddFlSFjE8CYs1uFwlJE4aqu', 'ENABLED', 'BASIC', 0, '', 'Tester2', 'Tester2', 35, 'Mendoza', 'Argentina');
COMMIT;
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
