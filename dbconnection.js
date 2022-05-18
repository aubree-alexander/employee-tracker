//where we bring in credentials and connect to 3306 PORT (on sql workbench)
//this page is teh bridge between sql server and JS! 

const mysql = require('mysql2')

//create connection based on mysql variables
const connection = mysql.createConnection({ 
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker'
});

module.exports = connection;

