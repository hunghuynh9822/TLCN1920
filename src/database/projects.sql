/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100011
 Source Host           : 192.168.200.1:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100011
 File Encoding         : 65001

 Date: 06/01/2020 01:47:07
*/


-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS "public"."projects";
CREATE TABLE "public"."projects" (
  "id" int8 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "state" int4,
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO "public"."projects" VALUES (15776774274194, 'Website thương mại điện tử', 'Xây dựng website thương mại điện tử với Reactjs', 0, 1577677427419, 1577677427419);
INSERT INTO "public"."projects" VALUES (15776775042945, 'Website bán điện thoại', 'Xây dựng website như thế giới di động', 0, 1577677504295, 1577677504295);
INSERT INTO "public"."projects" VALUES (15782413529296, 'Website bán quần áo', 'Bán quần áo chuyên về đồ nam', 0, 1578241352980, 1578241352980);
INSERT INTO "public"."projects" VALUES (15782413529787, 'Website bán quần áo', 'Bán quần áo chuyên về đồ nam', 0, 1578241352980, 1578241352980);

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");
