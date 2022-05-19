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