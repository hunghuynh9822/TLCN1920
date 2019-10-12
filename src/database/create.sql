CREATE IF NOT EXISTS TABLE "public"."users" (
  "id" int8 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE IF NOT EXISTS TABLE "public"."employees" (
  "id" int8 NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8,
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."employees" ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."employees" ADD CONSTRAINT "user_id" FOREIGN KEY ("id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE IF NOT EXISTS TABLE "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."roles" ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");
INSERT INTO "public"."roles" VALUES (1, 'ROLE_ADMIN', 1567937957503, NULL);
INSERT INTO "public"."roles" VALUES (2, 'ROLE_EMPLOYEE', 1567937962314, NULL);

CREATE IF NOT EXISTS TABLE "public"."user_roles" (
  "user_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "create_at" int8 NOT NULL,
  "update_at" int8
)
;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE IF NOT EXISTS TABLE "public"."genuid" (
  "id" int4 NOT NULL,
  "index" int4,
  "count" int8
)
;
INSERT INTO "public"."genuid" VALUES (1, 0, 0);