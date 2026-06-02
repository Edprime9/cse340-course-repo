-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- WEEK02
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
    FOREIGN KEY (organization_id)
    REFERENCES organization(organization_id)
);

-- 
INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES

-- Hope Foundation Projects
(1, 'Food Drive', 'Distribute food to families', 'Lagos', '2026-06-10'),
(1, 'School Supplies Donation', 'Donate books and bags', 'Abuja', '2026-06-15'),
(1, 'Medical Outreach', 'Free health checks', 'Port Harcourt', '2026-06-20'),
(1, 'Clothing Donation', 'Donate clothes to children', 'Ibadan', '2026-06-25'),
(1, 'Widow Support Program', 'Support widows financially', 'Benin', '2026-06-30'),

-- Green Earth Initiative Projects
(2, 'Tree Planting', 'Plant trees in schools', 'Enugu', '2026-07-05'),
(2, 'Beach Cleanup', 'Clean up beach waste', 'Lagos', '2026-07-10'),
(2, 'Recycling Campaign', 'Promote recycling awareness', 'Uyo', '2026-07-15'),
(2, 'Community Sanitation', 'Environmental sanitation', 'Kaduna', '2026-07-20'),
(2, 'Eco Club Training', 'Train school eco clubs', 'Jos', '2026-07-25'),

-- Youth Empowerment Network Projects
(3, 'Coding Bootcamp', 'Teach web development', 'Lagos', '2026-08-01'),
(3, 'Career Workshop', 'Career guidance for youths', 'Abuja', '2026-08-05'),
(3, 'Leadership Seminar', 'Leadership development', 'Owerri', '2026-08-10'),
(3, 'Entrepreneurship Training', 'Teach business skills', 'Abeokuta', '2026-08-15'),
(3, 'Digital Skills Training', 'Teach digital marketing', 'Calabar', '2026-08-20');

-- Categories Table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Insert Sample Categories
INSERT INTO categories (name, description)
VALUES
('Education', 'Projects related to schools and learning'),
('Health', 'Projects focused on healthcare and wellness'),
('Environment', 'Projects that improve the environment'),
('Community Service', 'Projects that support local communities'),
('Technology', 'Projects involving digital and technical skills');

-- 
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_projects(project_id),

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 4),
(1, 2),

(2, 1),

(3, 2),

(4, 4),

(5, 4),

(6, 3),

(7, 3),
(7, 4),

(8, 3),

(9, 4),

(10, 3),

(11, 5),
(11, 1),

(12, 1),

(13, 4),

(14, 5),

(15, 5);

-- ==========================================
-- Create Roles Table
-- ==========================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- ==========================================
-- Insert Initial Roles
-- ==========================================

INSERT INTO roles (role_name, role_description)
VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify roles
SELECT * FROM roles;

-- ==========================================
-- Create Users Table
-- ==========================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Test User Insert
-- ==========================================

INSERT INTO users (name, email, password_hash, role_id)
VALUES (
    'testuser',
    'test@example.com',
    'placeholder_hash',
    1
);

-- ==========================================
-- Verify Relationship with JOIN
-- ==========================================

SELECT
    u.user_id,
    u.name,
    u.email,
    r.role_name,
    r.role_description
FROM users u
JOIN roles r
ON u.role_id = r.role_id;

-- ==========================================
-- Remove Test User
-- ==========================================

DELETE FROM users
WHERE email = 'test@example.com';