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

 Date: 15/03/2020 10:38:26
*/


-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS "public"."employees";
CREATE TABLE "public"."employees" (
  "id" int8 NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8,
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default",
  "id_number" varchar(64) COLLATE "pg_catalog"."default",
  "id_created" int8,
  "id_location" text COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "position_id" int4,
  "bank_number" varchar(255) COLLATE "pg_catalog"."default",
  "bank_name" varchar(255) COLLATE "pg_catalog"."default",
  "bank_branch" varchar(255) COLLATE "pg_catalog"."default",
  "birthday" int8,
  "start_time" int8
)
;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO "public"."employees" VALUES (15714589149401, 1571458915080, NULL, 'Huỳnh', 'Lê Hữu', 'Hưng', '025699321', 1354406400000, 'CA Hồ Chí Minh', 'Số 05 đường 3643A Phạm Thế Hiển, P7, Q8, Tp HCM', 1, '1234 5678 91011', 'BIDV', 'CN Quận 8', 888105600000, 1561939200000);
INSERT INTO "public"."employees" VALUES (15746071512232, 1574607151401, 1574607151401, 'Nguyễn', 'Văn', 'Nhân Viên', '090912345678', 1574607032670, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 4, '0909123456789', 'BIDV', 'CN Đông Sài Gòn', 1574607032670, 1574607032670);
INSERT INTO "public"."employees" VALUES (15746072843063, 1574607284409, 1574607284409, 'Nguyễn', 'Văn', 'Trưởng Nhóm', '090945612378', 1574607174704, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 2, '0909456123789', 'BIDV', 'CN Đông Sài Gòn', 1574607174704, 1574607174704);
INSERT INTO "public"."employees" VALUES (15746074348584, 1574607434958, 1574607434958, 'Nguyễn', 'Thị', 'Nhân Viên', '090965432178', 1574607299894, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 4, '0909654321789', 'BIDV', 'CN Đông Sài Gòn', 1574607299894, 1574607299894);
INSERT INTO "public"."employees" VALUES (15751881480165, 1575188148423, 1575254245212, 'Thai', 'Thanh ', 'Liem', '123456789', 1575188038182, 'tphcm quan 6 p13', 'Quận 6', 2, '123456789', 'saccombank', 'phu lam', 1520064780000, 1575188038182);
INSERT INTO "public"."employees" VALUES (15782398324826, 1578239832616, 1578239832616, 'Pham', 'Ngoc', 'Dieu', '098712347564', 1453309200000, 'TP HCM', 'Quận 3', 4, '34253426435645', 'Pham Ngoc Dieu', 'Phu Lam', 1578239749399, 1578239749399);
INSERT INTO "public"."employees" VALUES (15782401353207, 1578240135422, 1578240135422, 'Nguyễn ', 'Thanh ', 'Tân', '234235676786', 1451926800000, 'Ca Mau', '100 Võ Văn Ngân Thủ Đức', 4, '2134567542343', 'Thanh Tân', 'Đông Sài Gòn', 883674000000, 1578239988511);
INSERT INTO "public"."employees" VALUES (15782405203918, 1578240520490, 1578240520490, 'Phan Thị ', 'Thùy ', 'Dương', '3247456435324', 1465059600000, 'Vũng Tàu', '3 Võ Văn Kiêt P5 Q5 Tp HCM', 4, '3245346345243', 'Thuy Duong', 'Bắc Sài Gòn', 883933200000, 1559667600000);
INSERT INTO "public"."employees" VALUES (15782407734329, 1578240773533, 1578240773533, 'Đặng ', 'Thị ', 'Duyên', '21321432423', 1451926800000, 'Bình Định', '50 Bùi Viện Quận 1 TP HCM', 4, '12324234123', 'Dang Thi Duyen', 'Sai Gon', 883933200000, 1546966800000);
INSERT INTO "public"."employees" VALUES (15782708385800, 1578270838676, 1578270838676, 'Nguyễn ', 'Thị ', 'Phúc', '4353634523454', 1388941200000, 'An Giang', '853 An Dương Vương P13 Q6 Tp HCM', 4, '235346453245', 'Phuc', 'Bắc Sài Gòn', 820861200000, 1578270700792);

-- ----------------------------
-- Table structure for genuid
-- ----------------------------
DROP TABLE IF EXISTS "public"."genuid";
CREATE TABLE "public"."genuid" (
  "id" int4 NOT NULL,
  "index" int4,
  "count" int8
)
;

-- ----------------------------
-- Records of genuid
-- ----------------------------
INSERT INTO "public"."genuid" VALUES (2, 1, 211);
INSERT INTO "public"."genuid" VALUES (3, 7, 17);
INSERT INTO "public"."genuid" VALUES (1, 0, 10);

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
INSERT INTO "public"."notify" VALUES (15758195713268, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15758195714340, 15751881480165, 'Thai Thanh  Liem', 1575794370818, '14h hôm nay mọi người họp gấp nhé !!!', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15781565073842, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15781570573547, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15751881480165, 't');
INSERT INTO "public"."notify" VALUES (15781570573124, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578157057256, 'Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15781565073560, 15714589149401, 'Huỳnh Lê Hữu Hưng', 1578156507301, 'Team backend 3h họp ', 15714589149401, 't');
INSERT INTO "public"."notify" VALUES (15782423044988, 15751881480165, 'Thai Thanh  Liem', 1578242298493, 'Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace', 15782407734329, 'f');
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
-- Table structure for perofproject
-- ----------------------------
DROP TABLE IF EXISTS "public"."perofproject";
CREATE TABLE "public"."perofproject" (
  "pro_id" int8 NOT NULL,
  "employee_id" int8 NOT NULL,
  "role" int4
)
;

-- ----------------------------
-- Records of perofproject
-- ----------------------------
INSERT INTO "public"."perofproject" VALUES (15776774274194, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15776775042945, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15776775042945, 15746072843063, 2);
INSERT INTO "public"."perofproject" VALUES (15776775042945, 15751881480165, 1);
INSERT INTO "public"."perofproject" VALUES (15776775042945, 15746074348584, 2);
INSERT INTO "public"."perofproject" VALUES (15782413529787, 15751881480165, 0);
INSERT INTO "public"."perofproject" VALUES (15782413529296, 15751881480165, 0);
INSERT INTO "public"."perofproject" VALUES (15782413529787, 15782398324826, 1);
INSERT INTO "public"."perofproject" VALUES (15782413529787, 15782401353207, 2);
INSERT INTO "public"."perofproject" VALUES (15782413529296, 15714589149401, 1);
INSERT INTO "public"."perofproject" VALUES (15782413529296, 15782405203918, 2);
INSERT INTO "public"."perofproject" VALUES (15782413529296, 15746074348584, 2);
INSERT INTO "public"."perofproject" VALUES (15776774274194, 15782398324826, 2);
INSERT INTO "public"."perofproject" VALUES (15776774274194, 15782401353207, 2);
INSERT INTO "public"."perofproject" VALUES (15776774274194, 15751881480165, 1);
INSERT INTO "public"."perofproject" VALUES (15782413529296, 15782398324826, 2);
INSERT INTO "public"."perofproject" VALUES (15782413529787, 15782407734329, 2);

-- ----------------------------
-- Table structure for positions
-- ----------------------------
DROP TABLE IF EXISTS "public"."positions";
CREATE TABLE "public"."positions" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of positions
-- ----------------------------
INSERT INTO "public"."positions" VALUES (1, 'Management', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (2, 'Team Leader', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (3, 'Human Resource', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (4, 'Staff', 1567937957503, NULL);

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
-- Table structure for requests
-- ----------------------------
DROP TABLE IF EXISTS "public"."requests";
CREATE TABLE "public"."requests" (
  "id" int8 NOT NULL,
  "employeeid" int8,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "position" varchar(255) COLLATE "pg_catalog"."default",
  "timestart" int8,
  "timeend" int8,
  "reason" varchar(255) COLLATE "pg_catalog"."default",
  "confirm" bool
)
;

-- ----------------------------
-- Records of requests
-- ----------------------------
INSERT INTO "public"."requests" VALUES (15781546165702, 15714589149401, 'Huỳnh Lê Hữu Hưng', 'Management', 1579277760000, 1579364160000, 'Có việc riêng', 'f');
INSERT INTO "public"."requests" VALUES (15781546341123, 15714589149401, 'Huỳnh Lê Hữu Hưng', 'Management', 1579277760000, 1578241020000, 'Đi khám bệnh', 't');
INSERT INTO "public"."requests" VALUES (15782412682294, 15782398324826, 'Pham Ngoc Dieu', 'Staff', 1578241235742, 1578327600000, 'Vào ngân hàng làm thủ tục', 'f');
INSERT INTO "public"."requests" VALUES (15782425877254, 15782405203918, 'Phan Thị  Thùy  Dương', 'Staff', 1575218520000, 1575304920000, 'Về quê có việc gấp', 'f');
INSERT INTO "public"."requests" VALUES (15782410853822, 15782405203918, 'Phan Thị  Thùy  Dương', 'Staff', 1576599420000, 1576685820000, 'Đi họp phụ huynh cho con', 't');
INSERT INTO "public"."requests" VALUES (15782409956701, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575994560000, 1576080960000, 'Bị đau mắt', 't');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1, 'ROLE_ADMIN', 1567937957503, 1567937957503);
INSERT INTO "public"."roles" VALUES (2, 'ROLE_STAFF', 1567937962314, 1567937962314);
INSERT INTO "public"."roles" VALUES (3, 'ROLE_LEAD', 1567937962314, 1567937962314);
INSERT INTO "public"."roles" VALUES (4, 'ROLE_HR', 1567937962314, 1567937962314);

-- ----------------------------
-- Table structure for taskcomments
-- ----------------------------
DROP TABLE IF EXISTS "public"."taskcomments";
CREATE TABLE "public"."taskcomments" (
  "id" int8 NOT NULL,
  "task_id" int8,
  "employee_id" int8,
  "comment" text COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tasks";
CREATE TABLE "public"."tasks" (
  "id" int8 NOT NULL,
  "project_id" int8,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "pre_task_id" varchar(255) COLLATE "pg_catalog"."default";
  "started_at" int8,
  "duration" int4,
  "state" int4,
  "point" int4,
  "pre_task_id" varchar(255) COLLATE "pg_catalog"."default",
  "employee_creator" int8,
  "description" text COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8,
  "employee_assignee" int8
)
;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO "public"."tasks" VALUES (15782888628711, 15782413529787, 'xây dựng host', 1580362320000, 1, 0, 0, 15751881480165, 'OS : Ubuntu', 1578288862873, 1578288889987, 15782407734329);
INSERT INTO "public"."tasks" VALUES (15782702328641, 15782413529787, 'Dựng dbservice ', 1579479720000, 4, 0, 0, 15751881480165, 'Control giữa database và app', 1578270232864, 1578293860691, 15782398324826);
INSERT INTO "public"."tasks" VALUES (15782700612879, 15782413529787, 'Chức năng quản lý sản phẩm', 1580084220000, 5, 5, 5, 15751881480165, 'Thực hiện bằng reactjs tren web , react native trên moblie', 1578270061329, 1578273286299, 15782407734329);
INSERT INTO "public"."tasks" VALUES (15781633960389, 15776775042945, 'Kiểm thử hoá đơn', 1578163336617, 2, 0, 0, 15714589149401, 'Thực hiện kiểm thử chức năng xem đơn hàng', 1578163396038, 1578165103476, 15746074348584);
INSERT INTO "public"."tasks" VALUES (15781633349228, 15776775042945, 'Kiểm thử mua hàng', 1578163190347, 1, 0, 0, 15714589149401, 'Thực hiện kiểm thử chức năng mua danh sách sản phẩm', 1578163334925, 1578165132234, 15746074348584);
INSERT INTO "public"."tasks" VALUES (15776776576042, 15776775042945, 'Phân tích xử lý', 1577677608760, NULL, 5, 5, 15714589149401, 'Phân tích các chức năng có thể có', 1577677657604, 1578165200144, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15776777180033, 15776775042945, 'Giám sát quy trình', 1577677664519, NULL, 5, 5, 15714589149401, 'Đảm bảo đúng tiến độ với kế hoạch', 1577677718040, 1578165204441, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15776779867316, 15776775042945, 'Giám sát quy trình triển khai', 1577677927342, NULL, 5, 5, 15714589149401, 'Đảm bảo quy trình triển khai đúng kế hoạch', 1577677986731, 1578165208851, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15781417459898, 15776775042945, 'Thiết kế biểu mẫu login', 1578141684385, 2, 5, 4, 15714589149401, 'Mô tả chi tiết từng biểu biểu login', 1578141746000, 1578165212966, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15782696929356, 15782413529787, 'Chức năng xem sản phẩm', 1578960720000, 3, 1, 5, 15751881480165, 'Có thể chọn các loại, theo giá, theo màu', 1578269692936, 1578274182717, 15782401353207);
INSERT INTO "public"."tasks" VALUES (15782698474708, 15782413529787, 'Thiết kế giao diện ', 1579133760000, 6, 5, 4, 15751881480165, 'Sử dung biểu mẫu và use-case để thực hiện', 1578269847470, 1578269889725, 15782407734329);
INSERT INTO "public"."tasks" VALUES (15782701408610, 15782413529787, 'Dựng server trên aws', 1580084460000, 2, 5, 4, 15751881480165, 'Chạy trên nền Ubuntu , Docker ', 1578270140862, 1578288761547, 15782401353207);
INSERT INTO "public"."tasks" VALUES (15776775543901, 15776775042945, 'Khảo sát hiện trạng', 1577677515118, NULL, 1, 0, 15714589149401, 'Tìm hiểu các website hiện có trên thị trường', 1577677554390, 1578200924920, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15776778448415, 15776775042945, 'Giám sát quy trình kiểm thử', 1577677802796, NULL, 1, 0, 15714589149401, 'Đảm bảo đi đúng kế hoạch', 1577677844877, 1578200928526, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15776777978154, 15776775042945, 'Xây dựng API tính năng mua hàng', 1577677749221, NULL, 2, 0, 15714589149401, 'Xây dựng api cho tính năng mua hàng', 1577677797835, 1578200985625, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15776780298297, 15776775042945, 'Xây dựng API đăng nhập', 1577677985459, NULL, 3, 0, 15714589149401, 'Xây dựng tính năng đăng nhập với mạng xã hội hiện có', 1577678029829, 1578201005882, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15781650578270, 15776775042945, 'Kiểm thử xem hàng', 1578164992279, 3, 4, 0, 15714589149401, 'Thực hiện kiểm thử chức năng xem danh sách sản phẩm', 1578165057828, 1578201022688, 15746074348584);
INSERT INTO "public"."tasks" VALUES (15782414591315, 15782413529787, 'Mô tả use-case', 1578241354076, 3, 0, 0, 15751881480165, 'Chi tiết cho từng chức năng ', 1578241459166, 1578241488810, 15782407734329);
INSERT INTO "public"."tasks" VALUES (15782415862616, 15782413529787, 'Thiết kế biểu mẫu', 1578241495510, 6, 4, 5, 15751881480165, 'Xây dựng rõ ràng chi tiết cho từng form', 1578241586261, 1578270520073, 15782401353207);
INSERT INTO "public"."tasks" VALUES (15782697714607, 15782413529787, 'Chức năng thanh toán', 1578874440000, 5, 5, 4, 15751881480165, 'Cần cho thanh toán qua thẻ của tất cả ngân hàng', 1578269771461, 1578270598534, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15782710871615, 15782413529296, 'Mô tả dữ liệu ', 1578011760000, 1, 0, 0, 15751881480165, 'full chức năng', 1578271087162, 1578271093132, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15782716755476, 15776774274194, 'Thu thập thông tin ', 1575161160000, 2, 0, 0, 15751881480165, 'Tìm kiểm đánh giá sản phẩm sắp thực hiện ', 1578271675548, 1578271675548, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15782717407117, 15776774274194, 'Thiết kế biểu mẫu', 1575420420000, 4, 0, 0, 15751881480165, 'Chỉ tiết các form có thể xuất hiện ', 1578271740711, 1578271740711, 15782398324826);
INSERT INTO "public"."tasks" VALUES (15782718038678, 15776774274194, 'Thiết kế CSDL', 1575852540000, 3, 0, 0, 15751881480165, 'Bằng postgress', 1578271803868, 1578271803868, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15782729221470, 15782413529296, 'Chức năng đăng nhập ', 1578013680000, 5, 5, 4, 15751881480165, 'chức năng đăng nhập', 1578272922147, 1578272973912, 15782405203918);
INSERT INTO "public"."tasks" VALUES (15782728829399, 15782413529296, 'Xác định yêu cầu', 1578272760000, 2, 0, 0, 15751881480165, 'Xác định yêu cầu', 1578272882939, 1578273012445, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15782709970624, 15782413529296, 'Gặp khách hàng', 1577838900000, 5, 0, 0, 15751881480165, 'Gửi mail cho khách hàng hẹn gặp mặt', 1578270997063, 1578273028353, 15746074348584);
INSERT INTO "public"."tasks" VALUES (15782695562435, 15782413529787, 'Chức năng đăng nhập', 1578874260000, 3, 2, 5, 15751881480165, 'Có gg authentica', 1578269556244, 1578274184074, 15782401353207);
INSERT INTO "public"."tasks" VALUES (15782704812173, 15782413529787, 'Chức năng thống kê', 1579825620000, 4, 0, 0, 15751881480165, 'Theo sản phẩm, theo giá bán , doanh thu', 1578270481217, 1578275725458, 15782398324826);
INSERT INTO "public"."tasks" VALUES (15782704253822, 15782413529787, 'Chức năng search', 1579134180000, 7, 0, 0, 15751881480165, 'Tìm kiếm tất cả sản phẩm', 1578270425382, 1578275734675, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15782416909167, 15782413529787, 'Mô tả DB', 1578846360000, 4, 3, 5, 15751881480165, 'Nêu ra rõ các bảng và mối quan hệ', 1578241690916, 1578275764929, 15751881480165);

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "user_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO "public"."user_roles" VALUES (15714589149401, 1, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 3, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 2, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 4, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15746072843063, 3, 1574785905117, 1574785905117);
INSERT INTO "public"."user_roles" VALUES (15746072843063, 2, 1574785905118, 1574785905118);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 1, 1575188192653, 1575188192653);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 2, 1575188192655, 1575188192655);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 3, 1575188192656, 1575188192656);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 4, 1575188192656, 1575188192656);
INSERT INTO "public"."user_roles" VALUES (15746074348584, 2, 1577678249443, 1577678249443);
INSERT INTO "public"."user_roles" VALUES (15782398324826, 2, 1578240857443, 1578240857443);
INSERT INTO "public"."user_roles" VALUES (15782398324826, 4, 1578240857444, 1578240857444);
INSERT INTO "public"."user_roles" VALUES (15782401353207, 2, 1578240877551, 1578240877551);
INSERT INTO "public"."user_roles" VALUES (15782405203918, 4, 1578240897965, 1578240897965);
INSERT INTO "public"."user_roles" VALUES (15782407734329, 2, 1578240931391, 1578240931391);

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
INSERT INTO "public"."users" VALUES (15746072843063, 'test.lead.1@gmail.com', '0909456123', '$2a$10$QSzWFRz83r2eQnels2WUXuoKDc3EjiH/TPWqub95mTJQCXrSXslxa', 'local', NULL, NULL, NULL, 'f', 1574607284406, 1574785905109, 1);
INSERT INTO "public"."users" VALUES (15746071512232, 'test.staff.1@gmail.com', '0909123456', '$2a$10$TX/fSfJQuSENRFVu5GJkyO7LgWJMIzIyHt4mWDPtVfPqn1zOVX8wS', 'local', NULL, NULL, NULL, 'f', 1574607151398, 1577676436907, 2);
INSERT INTO "public"."users" VALUES (15746074348584, 'test.staff.2@gmail.com', '0909654321', '$2a$10$n39S1dPWhOjO.sz2Kzf85.VcyASAV1RbcqXD/o.O60sKGYElUO51m', 'local', NULL, NULL, NULL, 'f', 1574607434956, 1577678249435, 1);
INSERT INTO "public"."users" VALUES (15751881480165, 'thaithanhliem2704@gmail.com', '0961375203', '$2a$10$m9wfg.0ZBrIsjCVM9zBHKu3yO3X2Ti8RPNR787RvM9eWT/eFJOTHO', 'local', NULL, NULL, NULL, 'f', 1575188148420, 1578149629377, 1);
INSERT INTO "public"."users" VALUES (15782398324826, 'dieu@gmail.com', '0909457835', '$2a$10$LH2l5uDfK4K.9ZK79xpae.ZarRYMKHic5oorXBfpPlbW7V5x3UC9a', 'local', NULL, NULL, NULL, 'f', 1578239832614, 1578240857435, 1);
INSERT INTO "public"."users" VALUES (15782401353207, 'tan@gmail.com', '0909435123', '$2a$10$ohM5A5fD3jjS8Ed08H4H/uIN5hbp7YCFuEPIxo7S.2RCwwE5j3xfC', 'local', NULL, NULL, NULL, 'f', 1578240135421, 1578240877542, 1);
INSERT INTO "public"."users" VALUES (15782405203918, 'duong@gmail.com', '0909423765', '$2a$10$C1HjXuxHaHo.eFaScMC3X.lt..n5j.B4GDdFXruNWu6Fr0WGKDBe6', 'local', NULL, NULL, NULL, 'f', 1578240520489, 1578240897954, 1);
INSERT INTO "public"."users" VALUES (15782407734329, 'duyen@gmail.com', '0984763751', '$2a$10$q1eIeuwEE/af2t9Xjlj9ue17oC7uljSaA6ZubayE.2vivjLXIm.Ci', 'local', NULL, NULL, NULL, 'f', 1578240773532, 1578240931382, 1);
INSERT INTO "public"."users" VALUES (15782708385800, 'phuc@gmail.com', '098756351', '$2a$10$R7FnMro/EmdxYBKxOR5AJeqQ2Od5.n919zFHQwr1aLFJXDZqknJuq', 'local', NULL, NULL, NULL, 'f', 1578270838675, 1578270838675, 0);

-- ----------------------------
-- Primary Key structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "notify_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "perofproject_pkey" PRIMARY KEY ("pro_id", "employee_id");

-- ----------------------------
-- Primary Key structure for table positions
-- ----------------------------
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "taskcomments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table employees
-- ----------------------------
ALTER TABLE "public"."employees" ADD CONSTRAINT "employee_position" FOREIGN KEY ("position_id") REFERENCES "public"."positions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."employees" ADD CONSTRAINT "user_id" FOREIGN KEY ("id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "creator_employee" FOREIGN KEY ("create_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."notify" ADD CONSTRAINT "receiver_employee" FOREIGN KEY ("receive_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "employee_project" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "project_constraint" FOREIGN KEY ("pro_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "request_of" FOREIGN KEY ("employeeid") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_employee" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_task" FOREIGN KEY ("task_id") REFERENCES "public"."tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "employee_assignee" FOREIGN KEY ("employee_assignee") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."tasks" ADD CONSTRAINT "employee_creator" FOREIGN KEY ("employee_creator") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."tasks" ADD CONSTRAINT "of_project" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Table structure for webhook
-- ----------------------------
DROP TABLE IF EXISTS "public"."webhook";
CREATE TABLE "public"."webhook" (
  "id_webhook" bigint PRIMARY KEY,
  "id_project" bigint NOT NULL,
  "name_webhook" varchar(255) NOT NULL,
  "bot_token" varchar(255) NOT NULL,
  "chat_id" varchar(355) NOT NULL,
  "create_task" bool,
  "update_task" bool,
  "update_state" bool
)
;

-- ----------------------------
-- Table structure for wiki
-- ----------------------------
DROP TABLE IF EXISTS "public"."wiki";
CREATE TABLE "public"."wiki" (
  "wiki_id" bigint PRIMARY KEY,
  "wiki_title" varchar(255),
  "id_project" bigint,
  "created_by" bigint NOT NULL,
  "parent_path" varchar(500),
  "content" text,
  "created_at" bigint,
  "updated_at" bigint
)
;