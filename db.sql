-- Vishal Manager Dashboard DB Schema & Seed

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS print_log;

CREATE TABLE departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  email TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK(status IN ('Pending','In Progress','Completed')) NOT NULL,
  assigned_to INTEGER,
  department_id INTEGER NOT NULL,
  due_date TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(assigned_to) REFERENCES members(id),
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE print_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL,
  printed_by INTEGER NOT NULL,
  department_id INTEGER NOT NULL,
  printed_at TEXT NOT NULL,
  notes TEXT,
  FOREIGN KEY(printed_by) REFERENCES members(id),
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

-- Seed Departments
INSERT INTO departments (name, description, created_at) VALUES
  ('CAD', 'Design and modeling', datetime('now')),
  ('CFD', 'Simulation and analysis', datetime('now')),
  ('Battery', 'Battery systems', datetime('now')),
  ('Electronics', 'Electronic subsystems', datetime('now')),
  ('Marketing', 'Outreach and promotion', datetime('now'));

-- Seed Members
INSERT INTO members (name, specialization, department_id, email, created_at) VALUES
  ('Alice', 'CAD Designer', 1, 'alice@company.com', datetime('now')),
  ('Bob', 'CFD Analyst', 2, 'bob@company.com', datetime('now')),
  ('Charlie', 'Battery Engineer', 3, 'charlie@company.com', datetime('now')),
  ('Diana', 'Electronics Lead', 4, 'diana@company.com', datetime('now')),
  ('Eve', 'Marketing Strategist', 5, 'eve@company.com', datetime('now')),
  ('Frank', 'CAD Modeler', 1, 'frank@company.com', datetime('now')),
  ('Grace', 'CFD Tester', 2, 'grace@company.com', datetime('now')),
  ('Heidi', 'Battery Tester', 3, 'heidi@company.com', datetime('now')),
  ('Ivan', 'Electronics Tester', 4, 'ivan@company.com', datetime('now')),
  ('Judy', 'Marketing Analyst', 5, 'judy@company.com', datetime('now')),
  ('Mallory', 'CAD Intern', 1, 'mallory@company.com', datetime('now')),
  ('Oscar', 'CFD Intern', 2, 'oscar@company.com', datetime('now'));

-- Seed Tasks
INSERT INTO tasks (title, description, status, assigned_to, department_id, due_date, created_at) VALUES
  ('Design Chassis', 'CAD for new chassis', 'Completed', 1, 1, '2025-09-10', datetime('now')),
  ('Simulate Airflow', 'CFD for airflow', 'In Progress', 2, 2, '2025-09-12', datetime('now')),
  ('Battery Pack Test', 'Test battery pack', 'Pending', 3, 3, '2025-09-15', datetime('now')),
  ('PCB Layout', 'Design PCB', 'Completed', 4, 4, '2025-09-11', datetime('now')),
  ('Social Media Campaign', 'Launch campaign', 'Completed', 5, 5, '2025-09-09', datetime('now')),
  ('Wheel Design', 'CAD for wheels', 'In Progress', 6, 1, '2025-09-13', datetime('now')),
  ('Thermal Simulation', 'CFD for thermal', 'Completed', 7, 2, '2025-09-10', datetime('now')),
  ('Cell Balancing', 'Battery cell balancing', 'Pending', 8, 3, '2025-09-16', datetime('now')),
  ('Sensor Integration', 'Integrate sensors', 'In Progress', 9, 4, '2025-09-14', datetime('now')),
  ('Event Planning', 'Plan outreach event', 'Completed', 10, 5, '2025-09-08', datetime('now')),
  ('Frame Analysis', 'CAD frame analysis', 'Completed', 1, 1, '2025-09-10', datetime('now')),
  ('Aerodynamics', 'CFD aerodynamics', 'Pending', 2, 2, '2025-09-17', datetime('now')),
  ('Battery Safety', 'Safety checks', 'Completed', 3, 3, '2025-09-12', datetime('now')),
  ('Circuit Debug', 'Debug circuits', 'In Progress', 4, 4, '2025-09-13', datetime('now')),
  ('Ad Design', 'Design ads', 'Completed', 5, 5, '2025-09-09', datetime('now')),
  ('CAD Review', 'Review CAD models', 'Pending', 6, 1, '2025-09-15', datetime('now')),
  ('CFD Validation', 'Validate CFD', 'Completed', 7, 2, '2025-09-10', datetime('now')),
  ('Battery Report', 'Prepare report', 'In Progress', 8, 3, '2025-09-14', datetime('now')),
  ('Microcontroller Setup', 'Setup microcontroller', 'Completed', 9, 4, '2025-09-11', datetime('now')),
  ('Market Analysis', 'Analyze market', 'Pending', 10, 5, '2025-09-16', datetime('now'));

-- Seed Print Log
INSERT INTO print_log (item_name, printed_by, department_id, printed_at, notes) VALUES
  ('Chassis Drawing', 1, 1, datetime('now', '-13 days'), 'Initial print'),
  ('Airflow Report', 2, 2, datetime('now', '-12 days'), ''),
  ('Battery Test Sheet', 3, 3, datetime('now', '-11 days'), ''),
  ('PCB Schematic', 4, 4, datetime('now', '-10 days'), ''),
  ('Campaign Poster', 5, 5, datetime('now', '-9 days'), ''),
  ('Wheel Blueprint', 6, 1, datetime('now', '-8 days'), ''),
  ('Thermal Sim Output', 7, 2, datetime('now', '-7 days'), ''),
  ('Cell Balancing Sheet', 8, 3, datetime('now', '-6 days'), 'Final version');