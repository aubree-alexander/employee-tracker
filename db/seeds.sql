USE employee_tracker;

--parameters that departments is expecting
--don't need to add primary key id here because auto increment keeps track and assigns id's sequentially. ONLY because we assigned it an auto increment
INSERT INTO departments (department_name)
VALUES ('Human Resources'), ('Talent'), ('IT'), ('Sales'), ('Janitorial')

INSERT INTO roles (job_title, role_salary, department_id)
VALUES ('Human Resources Specialist', 55000, 1), ('Human Resources Generalist', 70000, 1), ('Recruiter', 80000, 2), ('Vice President, Sales', 180000, 4), ('Talent Coordinator', 50000, 2), ('Janitorial Engineer', 90000, 5), ('Database Administrator', 80000, 3)

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ('Bob', 'Smith', 2, 2), ('Aubree', 'Alexander', 1, 1), ('Robby', 'Kurle', 3, 3), ('Maggie', 'Block', 4, 4), ('Michael', 'Scott', 5, 5)


