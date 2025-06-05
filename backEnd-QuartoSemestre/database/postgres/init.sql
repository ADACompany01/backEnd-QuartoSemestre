DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'adaservicesteam') THEN
      CREATE USER adaservicesteam WITH PASSWORD 'Ada@123';
   END IF;
END
$do$;

CREATE DATABASE adacompanydb OWNER adaservicesteam;

GRANT ALL PRIVILEGES ON DATABASE adacompanydb TO adaservicesteam;
