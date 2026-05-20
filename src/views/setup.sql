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