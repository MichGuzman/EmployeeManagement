CREATE TABLE department_employee AS
SELECT 
    d.name AS department, 
    CONCAT(e.first_name, ' ', e.last_name) AS "Employee Name",
    r.title AS "Role",
    r.salary AS "Salary",
    COALESCE(CONCAT(m.first_name, ' ', m.last_name), 'N/A') AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY d.name, r.title;
