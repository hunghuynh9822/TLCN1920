/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100010
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100010
 File Encoding         : 65001

 Date: 05/12/2019 20:01:18
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "provider" varchar(255) COLLATE "pg_catalog"."default",
  "provider_id" varchar(255) COLLATE "pg_catalog"."default",
  "oauth2_name" varchar(255) COLLATE "pg_catalog"."default",
  "image_url" varchar(255) COLLATE "pg_catalog"."default",
  "email_verified" bool,
  "created_at" int8,
  "updated_at" int8,
  "status" int4 NOT NULL
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (15714589149401, 'huuhung9822@gmail.com', '0938781162', '$2a$10$uPjQ.ZhoRY1mqiWvSupRUOyXWM0yR7MoHix85oRk.Ls7BY/K8pXIq', 'google', '107889025848008063650', 'Hưng Huỳnh', 'https://lh4.googleusercontent.com/-vao6VCfseGo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reIFx6E9VfOMlCmZEleSK2kvEAJFg/photo.jpg', 't', 1571458915068, NULL, 1);
INSERT INTO "public"."users" VALUES (15746074348584, 'test.staff.2@gmail.com', '0909654321', '$2a$10$n39S1dPWhOjO.sz2Kzf85.VcyASAV1RbcqXD/o.O60sKGYElUO51m', 'local', NULL, NULL, NULL, 'f', 1574607434956, 1574607434956, 0);
INSERT INTO "public"."users" VALUES (15746072843063, 'test.lead.1@gmail.com', '0909456123', '$2a$10$QSzWFRz83r2eQnels2WUXuoKDc3EjiH/TPWqub95mTJQCXrSXslxa', 'local', NULL, NULL, NULL, 'f', 1574607284406, 1574785905109, 1);
INSERT INTO "public"."users" VALUES (15746071512232, 'test.staff.1@gmail.com', '0909123456', '$2a$10$TX/fSfJQuSENRFVu5GJkyO7LgWJMIzIyHt4mWDPtVfPqn1zOVX8wS', 'local', NULL, NULL, NULL, 'f', 1574607151398, 1574789578695, 1);
INSERT INTO "public"."users" VALUES (15751881480165, 'thaithanhliem2704@gmail.com', '0961375203', '$2a$10$HXE1ASaNmk4QMiPvzISCQe8phA6ZGp1S0cbqXLdCJ6xaR61iNBF6e', 'local', NULL, NULL, NULL, 'f', 1575188148420, 1575188192646, 1);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
