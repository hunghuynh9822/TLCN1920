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
INSERT INTO "public"."users" VALUES (15751881480165, 'thaithanhliem2704@gmail.com', '0961375203', '$2a$10$HXE1ASaNmk4QMiPvzISCQe8phA6ZGp1S0cbqXLdCJ6xaR61iNBF6e', 'local', NULL, NULL, NULL, 'f', 1575188148420, 1575188192646, 1);
INSERT INTO "public"."users" VALUES (15746071512232, 'test.staff.1@gmail.com', '0909123456', '$2a$10$TX/fSfJQuSENRFVu5GJkyO7LgWJMIzIyHt4mWDPtVfPqn1zOVX8wS', 'local', NULL, NULL, NULL, 'f', 1574607151398, 1577676436907, 2);
INSERT INTO "public"."users" VALUES (15746074348584, 'test.staff.2@gmail.com', '0909654321', '$2a$10$n39S1dPWhOjO.sz2Kzf85.VcyASAV1RbcqXD/o.O60sKGYElUO51m', 'local', NULL, NULL, NULL, 'f', 1574607434956, 1577678249435, 1);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


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
-- Primary Key structure for table positions
-- ----------------------------
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");


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

-- ----------------------------
-- Foreign Keys structure for table employees
-- ----------------------------
ALTER TABLE "public"."employees" ADD CONSTRAINT "employee_position" FOREIGN KEY ("position_id") REFERENCES "public"."positions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."employees" ADD CONSTRAINT "user_id" FOREIGN KEY ("id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


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
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");


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

-- ----------------------------
-- Primary Key structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- ----------------------------
-- Foreign Keys structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


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
INSERT INTO "public"."genuid" VALUES (1, 5, 5);
INSERT INTO "public"."genuid" VALUES (3, 5, 15);
INSERT INTO "public"."genuid" VALUES (2, 7, 137);


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

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");


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

-- ----------------------------
-- Primary Key structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "perofproject_pkey" PRIMARY KEY ("pro_id", "employee_id");

-- ----------------------------
-- Foreign Keys structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "employee_project" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "project_constraint" FOREIGN KEY ("pro_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tasks";
CREATE TABLE "public"."tasks" (
  "id" int8 NOT NULL,
  "project_id" int8,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "started_at" int8,
  "duration" int4,
  "state" int4,
  "point" int4,
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
INSERT INTO "public"."tasks" VALUES (15776776576042, 15776775042945, 'Phân tích xử lý', 1577677608760, NULL, 0, 0, 15714589149401, 'Phân tích các chức năng có thể có', 1577677657604, 1577677657604, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15776777180033, 15776775042945, 'Giám sát quy trình', 1577677664519, NULL, 0, 0, 15714589149401, 'Đảm bảo đúng tiến độ với kế hoạch', 1577677718040, 1577677718040, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15776777978154, 15776775042945, 'Xây dựng API tính năng mua hàng', 1577677749221, NULL, 0, 0, 15714589149401, 'Xây dựng api cho tính năng mua hàng', 1577677797835, 1577677797835, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15776779867316, 15776775042945, 'Giám sát quy trình triển khai', 1577677927342, NULL, 0, 0, 15714589149401, 'Đảm bảo quy trình triển khai đúng kế hoạch', 1577677986731, 1577677986731, 15714589149401);
INSERT INTO "public"."tasks" VALUES (15776780298297, 15776775042945, 'Xây dựng API đăng nhập', 1577677985459, NULL, 0, 0, 15714589149401, 'Xây dựng tính năng đăng nhập với mạng xã hội hiện có', 1577678029829, 1577678029829, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15776775543901, 15776775042945, 'Khảo sát hiện trạng', 1577677515118, NULL, 0, 0, 15714589149401, 'Tìm hiểu các website hiện có trên thị trường', 1577677554390, 1577678181557, 15751881480165);
INSERT INTO "public"."tasks" VALUES (15776778448415, 15776775042945, 'Giám sát quy trình kiểm thử', 1577677802796, NULL, 0, 0, 15714589149401, 'Đảm bảo đi đúng kế hoạch', 1577677844877, 1577678185425, 15751881480165);

-- ----------------------------
-- Primary Key structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "employee_assignee" FOREIGN KEY ("employee_assignee") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."tasks" ADD CONSTRAINT "employee_creator" FOREIGN KEY ("employee_creator") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."tasks" ADD CONSTRAINT "of_project" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


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
-- Primary Key structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "taskcomments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_employee" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_task" FOREIGN KEY ("task_id") REFERENCES "public"."tasks" ("id") ON DELETE SET NULL ON UPDATE CASCADE;


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
-- Primary Key structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "notify_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "creator_employee" FOREIGN KEY ("create_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."notify" ADD CONSTRAINT "receiver_employee" FOREIGN KEY ("receive_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


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
INSERT INTO "public"."requests" VALUES (15752142668940, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575214255103, 1575300600000, 'Di hoc', 't');
INSERT INTO "public"."requests" VALUES (15752541704051, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575254100000, 1575340500000, 'Đi học ', 't');
INSERT INTO "public"."requests" VALUES (15752542004592, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575254188067, 1575254188067, 'Đi làm', 'f');
INSERT INTO "public"."requests" VALUES (15757872533667, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575761959233, 1575761959233, 'Đi học ', 'f');
INSERT INTO "public"."requests" VALUES (15752142925351, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1577460660000, 1577547060000, 'Di ban nha', 't');

-- ----------------------------
-- Primary Key structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "request_of" FOREIGN KEY ("employeeid") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
