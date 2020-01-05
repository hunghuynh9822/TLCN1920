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

 Date: 06/01/2020 01:46:39
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
INSERT INTO "public"."notify" VALUES (15752214635352, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15752214635533, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752539228978, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752539230199, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757295276464, 15751881480165, 'Thai Thanh  Liem', 1575729526591, 'Đi học ', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757295276625, 15751881480165, 'Thai Thanh  Liem', 1575729526591, 'Đi học ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15757890807551, 15751881480165, 'Thai Thanh  Liem', 1575763879972, '3h hôm nay cty họp ở lầu 1', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15757890807380, 15751881480165, 'Thai Thanh  Liem', 1575763879972, '3h hôm nay cty họp ở lầu 1', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757899232024, 15751881480165, 'Thai Thanh  Liem', 1575764722595, 'Thứ 7 team Backend tăng ca nha!!!!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15757899232195, 15751881480165, 'Thai Thanh  Liem', 1575764722595, 'Thứ 7 team Backend tăng ca nha!!!!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758176560767, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758176560928, 15751881480165, 'Thai Thanh  Liem', 1575792455375, 'Noel mỗi người xuống phòng nhân sự ký tên nhận quà', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758177616882, 15751881480165, 'Thai Thanh  Liem', 1575792560770, 'Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758177617733, 15751881480165, 'Thai Thanh  Liem', 1575792560770, 'Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758179372235, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758179373566, 15751881480165, 'Thai Thanh  Liem', 1575792736589, 'Ngày 20/12 , họp team fondend ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758181646428, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758181647199, 15751881480165, 'Thai Thanh  Liem', 1575792964030, 'Công ty sẽ tất niên vào ngày 30/12/2019', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758183527792, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758183528125, 15751881480165, 'Thai Thanh  Liem', 1575793152262, 'Ngày 15/12 , Team nhân sự tổng kết lương thưởng', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758185237487, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758185239569, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758190377952, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758190379533, 15751881480165, 'Thai Thanh  Liem', 1575793836958, 'Chiều thứ 6 , mọi người được về sớm 1h nha !!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15758191223514, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758191225347, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15781562768456, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156276763, 'Ngay 10/1/2020 , Mọi người tham dự year party !', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15781570573305, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781570573466, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15758185237678, 15751881480165, 'Thai Thanh  Liem', 1575793323181, 'Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758191224426, 15751881480165, 'Thai Thanh  Liem', 1575793921803, 'Team Backend sẽ họp vào chiều nay nhé !!', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15758195713268, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758195714340, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15781565073842, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15781570573547, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15781570573124, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15781565073560, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15782423044988, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15782407734329, 'f');
INSERT INTO "public"."notify" VALUES (15782423047790, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15782423051792, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15781555385754, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155537992, 'Ngay 1/1/2020 , Mọi người được nghỉ nhé!!', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15781555386675, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155537992, 'Ngay 1/1/2020 , Mọi người được nghỉ nhé!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781555386856, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155537992, 'Ngay 1/1/2020 , Mọi người được nghỉ nhé!!', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15781555967168, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155596632, 'Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 ', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15781555967410, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155596632, 'Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 ', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15781555967581, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155596632, 'Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781557293093, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155729205, 'Có việc riêng', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781557293184, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578155729205, 'Có việc riêng', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15781562768547, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156276763, 'Ngay 10/1/2020 , Mọi người tham dự year party !', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15781562768708, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156276763, 'Ngay 10/1/2020 , Mọi người tham dự year party !', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781562768869, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156276763, 'Ngay 10/1/2020 , Mọi người tham dự year party !', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15781565073641, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15781565073883, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15782423046429, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15782398324826, 'f');
INSERT INTO "public"."notify" VALUES (15782423048291, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15746074348584, 'f');
INSERT INTO "public"."notify" VALUES (15782423058204, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15782405203918, 'f');
INSERT INTO "public"."notify" VALUES (15782423058795, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15782401353207, 'f');
INSERT INTO "public"."notify" VALUES (15782423053233, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15782424601966, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15782424602297, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15782424603299, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15782401353207, 'f');
INSERT INTO "public"."notify" VALUES (15782424603930, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15782398324826, 'f');
INSERT INTO "public"."notify" VALUES (15782424604931, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15782424606022, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15782407734329, 'f');
INSERT INTO "public"."notify" VALUES (15782424606433, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15782405203918, 'f');
INSERT INTO "public"."notify" VALUES (15782424602838, 15751881480165, 'Thai Thanh  Liem', 1578242460080, 'Team nhân sự, chiều nay họp ở phòng 2 nha', 15746074348584, 'f');

-- ----------------------------
-- Primary Key structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "notify_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "creator_employee" FOREIGN KEY ("create_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."notify" ADD CONSTRAINT "receiver_employee" FOREIGN KEY ("receive_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
