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


const addADepartment = () => {
        inquirer.prompt({
            type: 'input',
            name: 'departmentName',
            message: "What is the department name?"
        },
        ).then((response) => {
            // const departmentSelected = res.find(department => department.department_name === response.roleDepartment)
            connection.query('INSERT INTO departments SET ?', {
                department_name: response.departmentName,
            }, (err) => {
                if (err) {
                    throw err
                }
            console.log('New department has been added.')
            init()
            }) 
        })
}

const updateEmployeeRole = () => {
    connection.query(`SELECT * FROM employees;`, (err, res) => {
        if (err) {
            throw err
        }
        inquirer.prompt({
            type: 'list',
            name: 'employeesList',
            message: "Which employee would you like to update?",
            choices: res.map(employeeChoice => employeeChoice.first_name)
        },
        ).then((response) => {
            const chosenEmployee = response.employeesList
                // .substring(0, response.employeesList.indexOf(' ')))
            // console.log(chosenEmployee)
            connection.query(`SELECT * FROM roles;`, (err, res) => {
                if (err) {
                    throw err
                }
                inquirer.prompt({
                    type: 'list',
                    name: 'rolesList',
                    message: "What is the employee's new role?",
                    choices: res.map(roleChoice => roleChoice.job_title)
                },
                ).then((response) => {
                    const updatedRole = res.find(roleChoice => roleChoice.job_title === response.rolesList)
                    connection.promise().query(`UPDATE employees SET roles_id = ${updatedRole.id} WHERE first_name = '${chosenEmployee}'`)
                    .then(console.log('Employee has been updated.'))
                    .catch(err => console.log(err))
                    
                    init()
                    })
                })
            })
        })
    }
