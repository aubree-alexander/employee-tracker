const inquirer = require('inquirer');
const connection = require('./dbconnection.js')

//start connection; if error it'll show the error; then it'll start everything
connection.connect(function (err) {
    if (err) {
        throw err
    }
    init()
})


const questions = [
{
    type: 'list',
    name: 'view_options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
}
];



function init() {
    
    inquirer.prompt(questions)
        .then(response => {
            switch(response.view_options) {
                case 'View all departments': 
                    viewAllDepartments(); 
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addADepartment();
                    break;
                case 'Add a role':
                    addARole();
                    break;
                case 'Add an employee':
                    addAnEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
            }
        })
};


const viewAllDepartments = () => {
    connection.query('SELECT * FROM departments;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        init()
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employees;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        init()
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        init()
    })
}


//add an employee
const addAnEmployee = () => {
    connection.query('SELECT * FROM roles;', (err, res) => {
        if (err) {
            throw err
        }
        inquirer.prompt([{
            type: 'input',
            name: 'employeeFirstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is the employee's last name?"
        }, 
        {
            type: 'list',
            name: 'roleTitle',
            message: "What is the employee's role?",
            //the word role below is arbitrary; we named it
            //role is basically the response.
            choices: res.map(role => role.job_title)
        },
        {
            type: 'list',
            name: 'managerId',
            message: "What is the manager's ID number?",
            choices: ['1']
        }
        ]).then((response) => {
            const roleSelected = res.find(role => role.job_title === response.roleTitle)
            //? is placeholder for set
            connection.query('INSERT INTO employees SET ?', {
                //declare column name and value we want to insert
                first_name: response.employeeFirstName,
                last_name: response.employeeLastName,
                roles_id: roleSelected.id ,
                manager_id: response.managerId

            }, (err) => {
                if (err) {
                    throw err
                }
            console.log('New employee has been added.')
            init()
            }) 
        })
    
    })
}

const addARole = () => {
    connection.query('SELECT * FROM departments;', (err, res) => {
        if (err) {
            throw err
        }
        inquirer.prompt([{
            type: 'input',
            name: 'roleName',
            message: "What is the role name?"
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "What is the salary for this role?"
        }, 
        {
            type: 'list',
            name: 'roleDepartment',
            message: "What department does this role fall under?",
            choices: res.map(department => department.department_name)
        },
        ]).then((response) => {
            const departmentSelected = res.find(department => department.department_name === response.roleDepartment)
            connection.query('INSERT INTO roles SET ?', {
                job_title: response.roleName,
                role_salary: response.roleSalary,
                department_id: departmentSelected.id ,

            }, (err) => {
                if (err) {
                    throw err
                }
            console.log('New role has been added.')
            init()
            }) 
        })
    
    })
}


//the update one - ask 2 questions, may need 2 separate queries. will need to query the emploeye's table, map thru employees to choose one, in .then query the roles table, and map thru job title roles, and then have another .then, and do update query and third .then