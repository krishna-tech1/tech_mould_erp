-- Simple script to create ERP Project database
CREATE DATABASE "ERP Project" 
    WITH 
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.UTF-8'
    LC_CTYPE 'en_US.UTF-8';

-- Grant privileges to postgres user
GRANT ALL PRIVILEGES ON DATABASE "ERP Project" TO postgres;
