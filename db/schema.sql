DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker; 

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    role_salary INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);


CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    roles_id INTEGER NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (roles_id) REFERENCES roles (id)
);



