INSERT INTO department (name)
VALUES 
    ('Finance'), --1
    ('HR'), --2
    ('IT'), --3
    ('Development'), --4
    ('Marketing'), --5
    ('Accounts Payable'), --6
    ('Accounts Receivable'), --7
    ('Sales'); --8
	
INSERT INTO role (title, salary, department)
VALUES ('CEO',100000,1),
       ('CFO',100000,1),
       ('Controller',80000,1),
       ('Accountant',25000,1),
       ('Manager A/P',15000,6),
       ('Manager A/R',15000,7),
       ('Assistant A/P',8000,6),
       ('Assistant A/R',8000,7),
       ('Lead Developer',10000,4),
       ('Asistant Developer',5000,4),
       ('Designer',8000,5),
       ('HR',10000,2),
       ('IT',10000,3),
       ('Sales Rep.',12000,8),
       ('Sales Manager',18000,8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John','Wick',1,2),
       ('Robert','Luo',2,1),
       ('Caroline','Brown',3,2),
       ('Jack','Taylor',4,3),
       ('Carlos','Mendez',5,4),
       ('Karen','Hobson',7,5),
       ('Luis','Miller',6,4),
       ('Serena','William',8,7),
       ('Georgina','Smith',9,13),
       ('Megan','Jones',10,9),
       ('Liam','Johnson',11,12),
       ('Sophia','Williams',12,4),
       ('Ava','Martinez',13,4),
       ('Emily','Garcia',15,7),
       ('Olivia','Rodriguez',15,7),
       ('Isabella','Lopez',15,7),
       ('Victoria','Jackson',14,14),
       ('Aria','White',14,15),
       ('Grace','Thompson',14,16),
       ('Chloe','Garcia',14,14);
            

