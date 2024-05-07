-- Ensure the database exists (you should create the database or replace 'yourDatabaseName' with your existing database name)
CREATE DATABASE IF NOT EXISTS yourDatabaseName;
USE yourDatabaseName;

-- Drop the table if it already exists to avoid conflicts
DROP TABLE IF EXISTS CalculationHistory;

-- Create the table anew with the correct schema
CREATE TABLE CalculationHistory (
    id INT AUTO_INCREMENT,
    expression VARCHAR(255) NOT NULL,
    result VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
