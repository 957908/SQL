

```bash
14_SQL/sql_master_commands.md
```

---

# 1️⃣ DATABASE COMMANDS (DDL BASICS)

## Show all databases

```sql
SHOW DATABASES;
```

## Create database

```sql
CREATE DATABASE company;
```

## Use database

```sql
USE company;
```

## Delete database

```sql
DROP DATABASE company;
```

---

# 2️⃣ TABLE CREATION COMMANDS

## Create table

```sql
CREATE TABLE employee(
id INT,
name VARCHAR(50),
salary INT
);
```

## Show tables

```sql
SHOW TABLES;
```

## Describe table

```sql
DESC employee;
```

---

# 3️⃣ INSERT DATA COMMANDS

## Insert single record

```sql
INSERT INTO employee VALUES(1,'Rahul',50000);
```

## Insert specific columns

```sql
INSERT INTO employee(id,name)
VALUES(2,'Amit');
```

## Insert multiple rows

```sql
INSERT INTO employee VALUES
(3,'Neha',45000),
(4,'Pooja',60000);
```

---

# 4️⃣ SELECT COMMANDS (MOST IMPORTANT)

## Select all data

```sql
SELECT * FROM employee;
```

## Select specific column

```sql
SELECT name FROM employee;
```

## Select with condition

```sql
SELECT * FROM employee
WHERE salary > 50000;
```

---

# 5️⃣ UPDATE COMMANDS

## Update record

```sql
UPDATE employee
SET salary = 70000
WHERE id = 1;
```

---

# 6️⃣ DELETE COMMANDS

## Delete record

```sql
DELETE FROM employee
WHERE id = 2;
```

## Delete all records

```sql
DELETE FROM employee;
```

---

# 7️⃣ WHERE CLAUSE CONDITIONS

## AND condition

```sql
SELECT * FROM employee
WHERE salary > 30000 AND id < 5;
```

## OR condition

```sql
SELECT * FROM employee
WHERE salary > 60000 OR id = 1;
```

## NOT condition

```sql
SELECT * FROM employee
WHERE NOT salary = 50000;
```

---

# 8️⃣ ORDER BY (SORTING)

## Ascending order

```sql
SELECT * FROM employee
ORDER BY salary ASC;
```

## Descending order

```sql
SELECT * FROM employee
ORDER BY salary DESC;
```

---

# 9️⃣ GROUP BY COMMANDS

## Count employees per salary

```sql
SELECT salary, COUNT(*)
FROM employee
GROUP BY salary;
```

---

# 🔟 AGGREGATE FUNCTIONS (VERY IMPORTANT)

## COUNT

```sql
SELECT COUNT(*) FROM employee;
```

## SUM

```sql
SELECT SUM(salary) FROM employee;
```

## AVG

```sql
SELECT AVG(salary) FROM employee;
```

## MAX

```sql
SELECT MAX(salary) FROM employee;
```

## MIN

```sql
SELECT MIN(salary) FROM employee;
```

---

# 1️⃣1️⃣ LIKE OPERATOR

## Names starting with R

```sql
SELECT * FROM employee
WHERE name LIKE 'R%';
```

## Names ending with a

```sql
SELECT * FROM employee
WHERE name LIKE '%a';
```

---

# 1️⃣2️⃣ BETWEEN OPERATOR

```sql
SELECT * FROM employee
WHERE salary BETWEEN 30000 AND 60000;
```

---

# 1️⃣3️⃣ IN OPERATOR

```sql
SELECT * FROM employee
WHERE id IN (1,3,5);
```

---

# 1️⃣4️⃣ LIMIT COMMAND

```sql
SELECT * FROM employee
LIMIT 5;
```

---

# 1️⃣5️⃣ JOIN COMMANDS (VERY IMPORTANT)

Assume tables:

employee(id,name)
department(id,dept)

## INNER JOIN

```sql
SELECT e.name, d.dept
FROM employee e
INNER JOIN department d
ON e.id = d.id;
```

## LEFT JOIN

```sql
SELECT e.name, d.dept
FROM employee e
LEFT JOIN department d
ON e.id = d.id;
```

## RIGHT JOIN

```sql
SELECT e.name, d.dept
FROM employee e
RIGHT JOIN department d
ON e.id = d.id;
```

## FULL JOIN (conceptual / some DB only)

```sql
SELECT e.name, d.dept
FROM employee e
FULL JOIN department d
ON e.id = d.id;
```

---

# 1️⃣6️⃣ ALTER TABLE COMMANDS

## Add column

```sql
ALTER TABLE employee
ADD age INT;
```

## Modify column

```sql
ALTER TABLE employee
MODIFY age VARCHAR(5);
```

## Drop column

```sql
ALTER TABLE employee
DROP age;
```

---

# 1️⃣7️⃣ DROP TABLE COMMAND

```sql
DROP TABLE employee;
```

---

# 1️⃣8️⃣ CREATE VIEW

```sql
CREATE VIEW emp_view AS
SELECT name, salary
FROM employee;
```

Use view:

```sql
SELECT * FROM emp_view;
```

---

# 1️⃣9️⃣ INDEX COMMANDS (PERFORMANCE)

## Create index

```sql
CREATE INDEX idx_name
ON employee(name);
```

## Drop index

```sql
DROP INDEX idx_name;
```

---

# 2️⃣0️⃣ CONSTRAINT COMMANDS

## Primary key

```sql
CREATE TABLE student(
id INT PRIMARY KEY,
name VARCHAR(50)
);
```

## Unique constraint

```sql
email VARCHAR(100) UNIQUE
```

## Not null

```sql
name VARCHAR(50) NOT NULL
```

---

# 2️⃣1️⃣ SUBQUERY (ADVANCED)

## Salary greater than average salary

```sql
SELECT * FROM employee
WHERE salary >
(SELECT AVG(salary) FROM employee);
```

---

# 2️⃣2️⃣ HAVING CLAUSE

```sql
SELECT salary, COUNT(*)
FROM employee
GROUP BY salary
HAVING COUNT(*) > 1;
```

Difference:

| Clause | Works on |
| ------ | -------- |
| WHERE  | rows     |
| HAVING | groups   |

⭐ Exam favorite

---

# 2️⃣3️⃣ CASE STATEMENT

```sql
SELECT name,
CASE
WHEN salary > 50000 THEN 'HIGH'
ELSE 'LOW'
END
FROM employee;
```

---

# 2️⃣4️⃣ UNION COMMAND

```sql
SELECT name FROM emp1
UNION
SELECT name FROM emp2;
```

Remove duplicates automatically

Keep duplicates:

```sql
UNION ALL
```

---

# 2️⃣5️⃣ MOST IMPORTANT SQL EXAM TRAPS 🎯

Remember:

```
WHERE filters rows
HAVING filters groups
PRIMARY KEY = unique + not null
UNION removes duplicates
UNION ALL keeps duplicates
COUNT(*) counts rows
LIKE uses % wildcard
JOIN combines tables
GROUP BY required with aggregate

