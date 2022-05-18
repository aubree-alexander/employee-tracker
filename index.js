const inquirer = require('inquirer');


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
