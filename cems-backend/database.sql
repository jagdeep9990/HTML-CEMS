CREATE DATABASE IF NOT EXISTS cems_db;
USE cems_db;

CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    event_date DATE NULL,
    venue VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    college_name VARCHAR(150) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registration_event FOREIGN KEY (event_id)
        REFERENCES events(event_id) ON DELETE CASCADE,
    CONSTRAINT uq_event_student_email UNIQUE (event_id, email)
);

-- Seed events corresponding to the sample cards present in index.html.
INSERT IGNORE INTO events (title, category, event_date, venue, description) VALUES
('SAMPLE EVENT', 'Technical', NULL, 'Main Campus Labs', 'EVENT DESCRIPTION'),
('SAMPLE EVENT 2', 'Cultural', NULL, 'Open Air Theatre', 'EVENT DISCRIPTION');
