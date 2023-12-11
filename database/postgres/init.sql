-- Create the "static-data-service" database (errors if it already exists)
CREATE DATABASE "static-data-service";

-- Create the role "fortunatis" with a password (errors if it already exists)
CREATE ROLE fortunatis WITH LOGIN PASSWORD 'fortunatis';

-- Grant all privileges on the "static-data-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "static-data-service" TO fortunatis;

-- Grant privileges on all future tables within the "static-data-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "estate-service" database (errors if it already exists)
CREATE DATABASE "estate-service";

-- Grant all privileges on the "estate-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "estate-service" TO fortunatis;

-- Grant privileges on all future tables within the "estate-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "user-service" database (errors if it already exists)
CREATE DATABASE "user-service";

-- Grant all privileges on the "user-service" database to "fortunatis"
GRANT ALL PRIVILEGES ON DATABASE "user-service" TO fortunatis;

-- Grant privileges on all future tables within the "user-service" schema to "fortunatis"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO fortunatis;

-- Create the "auth-service" database (errors if it already exists)
CREATE DATABASE "auth-service";

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";