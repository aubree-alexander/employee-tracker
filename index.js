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
    type: 'input',
    name: 'view-options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an emploeye role']
}

];



function init() {
    
    inquirer.prompt(questions)
    // .then(function(response) {
        
    //     return fs.writeFileSync('README.md', generateMarkdown(response), function(err) {
    //         if (err) {
    //             throw err;
    //         };
    //     });
    // })
}

// Function call to initialize app
init();
