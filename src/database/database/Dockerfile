FROM postgres:10-alpine
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql", "/var/lib/postgresql/data"]
# run create.sql on init
ADD TLCN.sql /docker-entrypoint-initdb.d
