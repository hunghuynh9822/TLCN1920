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

 Date: 01/01/2020 11:45:28
*/


-- ----------------------------
-- Table structure for notify
-- ----------------------------
DROP TABLE IF EXISTS "public"."notify";
CREATE TABLE "public"."notify" (
  "id" int8 NOT NULL,
  "create_id" int8,
  "create_name" varchar(255) COLLATE "pg_catalog"."default",
  "create_time" int8,
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "receive_id" int8,
  "view" bool
)
;

-- ----------------------------
-- Records of notify
-- ----------------------------
INSERT INTO "public"."notify" VALUES (15752214634511, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15752214635352, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15752214635533, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752539228037, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15752539228978, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752539230199, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757295276464, 15751881480165, 'Thai Thanh  Liem', 1575729526591, 'Đi học ', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757295276625, 15751881480165, 'Thai Thanh  Liem', 1575729526591, 'Đi học ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15757295276796, 15751881480165, 'Thai Thanh  Liem', 1575729526591, 'Đi học ', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758190374800, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15758185237156, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15757890806858, 15751881480165, 'Thai Thanh  Liem', 1575763879972, '3h hôm nay cty họp ở lầu 1', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15757890807551, 15751881480165, 'Thai Thanh  Liem', 1575763879972, '3h hôm nay cty họp ở lầu 1', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15757890807380, 15751881480165, 'Thai Thanh  Liem', 1575763879972, '3h hôm nay cty họp ở lầu 1', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757899231202, 15751881480165, 'Thai Thanh  Liem', 1575764722595, 'Thứ 7 team Backend tăng ca nha!!!!!', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15757899232024, 15751881480165, 'Thai Thanh  Liem', 1575764722595, 'Thứ 7 team Backend tăng ca nha!!!!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757899232195, 15751881480165, 'Thai Thanh  Liem', 1575764722595, 'Thứ 7 team Backend tăng ca nha!!!!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758176560767, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758176560928, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758176561099, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758177614981, 15751881480165, 'Thai Thanh  Liem', 1575792560770, 'Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758177616882, 15751881480165, 'Thai Thanh  Liem', 1575792560770, 'Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758177617733, 15751881480165, 'Thai Thanh  Liem', 1575792560770, 'Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758179371484, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758179372235, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758179373566, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758181646428, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758181647199, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758181648171, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758183527792, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758183527953, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758183528125, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758185237487, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758185239569, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758190377952, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758190379533, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758191223514, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758191224255, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15758191225347, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758179374237, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758181647340, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758183528064, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758185237678, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758190376291, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758191224426, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758195713268, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758195714340, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758176560016, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758195713809, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15758195715091, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15751881480165, 't');

-- ----------------------------
-- Primary Key structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "notify_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "creator_employee" FOREIGN KEY ("create_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."notify" ADD CONSTRAINT "receiver_employee" FOREIGN KEY ("receive_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
