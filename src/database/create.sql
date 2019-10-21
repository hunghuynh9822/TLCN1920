CREATE TABLE IF NOT EXISTS "public"."users" (
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
  "updated_at" int8
)
;
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (15714589149401, 'huuhung9822@gmail.com', '0938781162', '$2a$10$uPjQ.ZhoRY1mqiWvSupRUOyXWM0yR7MoHix85oRk.Ls7BY/K8pXIq', 'google', '107889025848008063650', 'Hưng Huỳnh', 'https://lh4.googleusercontent.com/-vao6VCfseGo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reIFx6E9VfOMlCmZEleSK2kvEAJFg/photo.jpg', 't', 1571458915068, NULL);

CREATE TABLE IF NOT EXISTS "public"."positions" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;

ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");

INSERT INTO "public"."positions" VALUES (1, 'Management', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (2, 'Team Leader', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (3, 'Human Resource', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (4, 'Staff', 1567937957503, NULL);

CREATE TABLE IF NOT EXISTS "public"."employees" (
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
  "start_time" int8,
  "status" int4
)
;
ALTER TABLE "public"."employees" ADD CONSTRAINT "employee_position" FOREIGN KEY ("position_id") REFERENCES "public"."positions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."employees" ADD CONSTRAINT "user_id" FOREIGN KEY ("id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO "public"."employees" VALUES (15714589149401, 1571458915080, NULL, 'Huỳnh', 'Lê Hữu', 'Hưng', '025699321', 1354406400000, 'CA Hồ Chí Minh', 'Số 05 đường 3643A Phạm Thế Hiển, P7, Q8, Tp HCM', 1, '1234 5678 91011', 'BIDV', 'CN Quận 8', 888105600000, 1561939200000, 0);

CREATE TABLE IF NOT EXISTS  "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."roles" ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1, 'ROLE_ADMIN', 1567937957503, NULL);
INSERT INTO "public"."roles" VALUES (2, 'ROLE_STAFF', 1567937962314, NULL);
INSERT INTO "public"."roles" VALUES (3, 'ROLE_LEAD', 1567937962314, NULL);
INSERT INTO "public"."roles" VALUES (4, 'ROLE_HR', 1567937962314, NULL);

CREATE TABLE IF NOT EXISTS "public"."user_roles" (
  "user_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "create_at" int8 NOT NULL,
  "update_at" int8
)
;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "public"."genuid" (
  "id" int4 NOT NULL,
  "index" int4,
  "count" int8
)
;
-- ----------------------------
-- Records of genuid
-- ----------------------------
INSERT INTO "public"."genuid" VALUES (1, 1, 1);
INSERT INTO "public"."genuid" VALUES (2, 0, 0);
INSERT INTO "public"."genuid" VALUES (3, 0, 0);

CREATE TABLE IF NOT EXISTS "public"."tasks" (
  "id" int8 NOT NULL,
  "employeeid" int8,
  "projectid" int8,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "startdate" int8,
  "duration" int4,
  "status" bool,
  "point" int4 
)
;
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");

CREATE TABLE IF NOT EXISTS "public"."taskcomments" (
  "id" int8 NOT NULL,
  "taskid" int8,
  "employeeid" int8,
  "comment" text COLLATE "pg_catalog"."default",
  "createtime" int8
)
;
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "taskcomments_pkey" PRIMARY KEY ("id");

CREATE TABLE IF NOT EXISTS "public"."projects" (
  "id" int8 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "employeeid" int8,
  "createtime" int8,
  "submit" bool
)
;
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

CREATE TABLE IF NOT EXISTS "public"."perofproject" (
  "proid" int8 NOT NULL,
  "employeeid" int8 NOT NULL
)
;

ALTER TABLE "public"."perofproject" ADD CONSTRAINT "perofproject_pkey" PRIMARY KEY ("proid", "employeeid");