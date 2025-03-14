// import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

async function init() {
    console.log(`
        ==================================================

                    EMPLOYEE MANAGER SYSTEM
                    
        ==================================================
    `);
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome to our Company!\n What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ]
        }
    ]);

    switch (choice) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        default:
            quit();
            break;
    }
}

function quit() {
    console.log('Have a nice day!');
    return process.exit(0);
}

function updateEmployeeRole() {
    const employeeQuery = `SELECT CONCAT(first_name, ' ', last_name) as name, id as value FROM employee;`;
    pool.query(employeeQuery, async (err, result) => {
        if (err) throw err;
        const { employeeId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee would you like to update?',
                choices: result.rows
            }
        ]);

        const roleQuery = `SELECT id as value, title FROM role;`;
        pool.query(roleQuery, async (err, result) => {
            if (err) throw err;
            const { roleId } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role should the employee have?',
                    choices: result.rows
                }
            ]);

            const updateQuery = `UPDATE employee SET role_id = $1 WHERE id = $2;`;
            pool.query(updateQuery, [roleId, employeeId], (err, _result) => {
                if (err) throw err;
                console.log('Employee role has been updated!');
                init();
            });
        });
    });
}

function viewAllRoles() {
    const query = `
        SELECT 
            r.title AS "Role Title", 
            r.salary AS "Salary", 
            d.name AS "Department"
        FROM role r
        JOIN department d ON r.department = d.id; -- Asegúrate de usar el nombre correcto de la columna
    `;

    pool.query(query, (err, result) => {
        if (err) {
            console.error("Error retrieving roles:", err);
            return;
        }
        console.table(result.rows);
        init();
    });
}


function viewAllDepartments() {
    const query = `SELECT name FROM department;`;
    pool.query(query, (err, result) => {
        if (err) throw err;
        console.table(result.rows);
        init();
    });
}

async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department: '
        }
    ]);

    const query = `INSERT INTO department (name) VALUES ($1);`;
    pool.query(query, [departmentName], (err, _result) => {
        if (err) throw err;
        console.log(`${departmentName} has been added as a new department!`);
        init();
    });
}

function viewAllEmployees() {
    const query = `SELECT * FROM department_employee;`; // Consulta para mostrar los resultados de la nueva tabla
    pool.query(query, (err, result) => {
        if (err) throw err;
        console.table(result.rows); // Muestra los resultados en consola
        init(); // Llama a la función que sigue después de mostrar los datos
    });
}

function addEmployee() {
    const roleQuery = `SELECT id, title FROM role;`;
    const managerQuery = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;`;

    pool.query(roleQuery, (err, roleResults) => {
        if (err) throw err;
        const roles = roleResults.rows.map(role => ({ name: role.title, value: role.id }));

        pool.query(managerQuery, (err, managerResults) => {
            if (err) throw err;
            const managers = managerResults.rows.map(manager => ({ name: manager.name, value: manager.id }));
            managers.unshift({ name: "No Manager", value: null }); // Opción para empleados sin jefe

            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the Employe´s First Name:"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the Employe´s Last Name:"
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the Employe´s Role:",
                    choices: roles
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the employee´s manager:",
                    choices: managers
                }
            ]).then(answers => {
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
                const values = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

                pool.query(query, values, (err, result) => {
                    if (err) throw err;
                    console.log("¡Empleado agregado con éxito!");
                    init();
                });
            });
        });
    });
}

// Nueva función: Agregar un rol
async function addRole() {
    // Obtener los departamentos disponibles
    const deptQuery = `SELECT id as value, name FROM department;`;
    const deptResult = await pool.query(deptQuery);

    // Preguntar datos del nuevo rol
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Enter the role's title: ",
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter the role's salary: ",
            validate: (value) => !isNaN(value) ? true : "Please enter a valid number",
        },
        {
            type: 'list',
            name: 'departmentId',
            message: "Select the department for this role: ",
            choices: deptResult.rows,
        }
    ]);

    const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);`;
    pool.query(query, [title, salary, departmentId], (err, _result) => {
        if (err) throw err;
        console.log(`The role ${title} has been added successfully!`);
        init();
    });
}

init();
