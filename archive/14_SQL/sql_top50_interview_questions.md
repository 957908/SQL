Perfect 👍
Ab main tumhe **Top 50 SQL Interview Questions with Answers + Logic Explanation** structured format me deta hoon — ye **placements, CDAC, internships, data roles, backend interviews** sabke liye useful hai 📘💼

Suggested file:

```sql
14_SQL/sql_top50_interview_questions.md
```

---

# 🔥 TOP 50 SQL INTERVIEW QUESTIONS (WITH ANSWERS)

---

# SECTION 1 — BASIC SQL QUESTIONS

## 1️⃣ What is SQL?

SQL = **Structured Query Language**

Use hota hai:

* data insert
* data update
* data delete
* data retrieve
* database structure manage

---

## 2️⃣ Types of SQL commands?

| Type | Example                |
| ---- | ---------------------- |
| DDL  | CREATE, ALTER, DROP    |
| DML  | INSERT, UPDATE, DELETE |
| DQL  | SELECT                 |
| DCL  | GRANT, REVOKE          |
| TCL  | COMMIT, ROLLBACK       |

---

## 3️⃣ Difference between DELETE, TRUNCATE, DROP

| Command  | Deletes Data | Deletes Structure | Rollback Possible |
| -------- | ------------ | ----------------- | ----------------- |
| DELETE   | ✅            | ❌                 | ✅                 |
| TRUNCATE | ✅            | ❌                 | ❌                 |
| DROP     | ✅            | ✅                 | ❌                 |

---

## 4️⃣ Difference between WHERE and HAVING

| Clause | Works On |
| ------ | -------- |
| WHERE  | rows     |
| HAVING | groups   |

Example:

```sql
SELECT dept, COUNT(*)
FROM employee
GROUP BY dept
HAVING COUNT(*) > 5;
```

---

## 5️⃣ What is Primary Key?

Primary key:

* unique
* NOT NULL
* identifies each row

Example:

```sql
id INT PRIMARY KEY
```

---

## 6️⃣ What is Foreign Key?

Foreign key connects two tables

Example:

```sql
dept_id INT,
FOREIGN KEY(dept_id)
REFERENCES department(id)
```

---

## 7️⃣ Difference between PRIMARY KEY and UNIQUE

| Feature         | Primary Key | Unique |
| --------------- | ----------- | ------ |
| NULL allowed    | ❌           | ✅      |
| Count per table | 1           | many   |

---

## 8️⃣ What is NOT NULL constraint?

Prevents empty values

```sql
name VARCHAR(50) NOT NULL
```

---

## 9️⃣ What is DEFAULT constraint?

Assigns default value

```sql
salary INT DEFAULT 10000
```

---

## 🔟 What is INDEX?

Improves query speed ⚡

```sql
CREATE INDEX idx_name
ON employee(name);
```

---

# SECTION 2 — JOINS (VERY IMPORTANT)

## 1️⃣1️⃣ Types of joins

| Join       | Meaning                  |
| ---------- | ------------------------ |
| INNER JOIN | matching rows            |
| LEFT JOIN  | all left + matched right |
| RIGHT JOIN | all right + matched left |
| FULL JOIN  | all records              |

---

## 1️⃣2️⃣ INNER JOIN example

```sql
SELECT e.name, d.dept
FROM employee e
INNER JOIN department d
ON e.id = d.id;
```

---

## 1️⃣3️⃣ LEFT JOIN example

```sql
SELECT *
FROM employee e
LEFT JOIN department d
ON e.id = d.id;
```

Includes unmatched left rows

---

## 1️⃣4️⃣ SELF JOIN kya hota hai?

Table joins itself

```sql
SELECT a.name, b.name
FROM employee a
JOIN employee b
ON a.manager_id = b.id;
```

---

## 1️⃣5️⃣ CROSS JOIN kya hota hai?

Cartesian product

```sql
SELECT *
FROM emp
CROSS JOIN dept;
```

---

# SECTION 3 — AGGREGATE FUNCTIONS

## 1️⃣6️⃣ COUNT()

```sql
SELECT COUNT(*) FROM employee;
```

Counts rows

---

## 1️⃣7️⃣ SUM()

```sql
SELECT SUM(salary) FROM employee;
```

Adds values

---

## 1️⃣8️⃣ AVG()

```sql
SELECT AVG(salary) FROM employee;
```

Average value

---

## 1️⃣9️⃣ MAX()

```sql
SELECT MAX(salary) FROM employee;
```

Highest salary

---

## 2️⃣0️⃣ MIN()

```sql
SELECT MIN(salary) FROM employee;
```

Lowest salary

---

# SECTION 4 — INTERVIEW SCENARIO QUESTIONS

## 2️⃣1️⃣ Find 2nd highest salary

```sql
SELECT MAX(salary)
FROM employee
WHERE salary <
(
SELECT MAX(salary)
FROM employee
);
```

---

## 2️⃣2️⃣ Find duplicate records

```sql
SELECT name, COUNT(*)
FROM employee
GROUP BY name
HAVING COUNT(*) > 1;
```

---

## 2️⃣3️⃣ Remove duplicates

```sql
DELETE e1
FROM employee e1
JOIN employee e2
ON e1.name = e2.name
AND e1.id > e2.id;
```

---

## 2️⃣4️⃣ Find employees above average salary

```sql
SELECT *
FROM employee
WHERE salary >
(
SELECT AVG(salary)
FROM employee
);
```

---

## 2️⃣5️⃣ Find max salary per department

```sql
SELECT dept, MAX(salary)
FROM employee
GROUP BY dept;
```

---

# SECTION 5 — WINDOW FUNCTIONS

## 2️⃣6️⃣ ROW_NUMBER()

```sql
SELECT name,
ROW_NUMBER()
OVER(ORDER BY salary DESC)
FROM employee;
```

Unique ranking

---

## 2️⃣7️⃣ RANK()

Same values same rank

```sql
RANK() OVER(ORDER BY salary DESC)
```

---

## 2️⃣8️⃣ DENSE_RANK()

No gaps in ranking

```sql
DENSE_RANK() OVER(ORDER BY salary DESC)
```

---

## 2️⃣9️⃣ PARTITION BY

Department-wise ranking

```sql
ROW_NUMBER()
OVER(PARTITION BY dept ORDER BY salary DESC)
```

---

## 3️⃣0️⃣ Running total

```sql
SUM(salary)
OVER(ORDER BY id)
```

---

# SECTION 6 — SUBQUERY QUESTIONS

## 3️⃣1️⃣ Subquery kya hota hai?

Query inside query

Example:

```sql
SELECT *
FROM employee
WHERE salary >
(
SELECT AVG(salary)
FROM employee
);
```

---

## 3️⃣2️⃣ Correlated subquery kya hota hai?

Depends on outer query

Example:

```sql
SELECT *
FROM employee e
WHERE salary >
(
SELECT AVG(salary)
FROM employee
WHERE dept = e.dept
);
```

---

# SECTION 7 — NORMALIZATION QUESTIONS

## 3️⃣3️⃣ 1NF kya hota hai?

No repeating columns

---

## 3️⃣4️⃣ 2NF kya hota hai?

No partial dependency

---

## 3️⃣5️⃣ 3NF kya hota hai?

No transitive dependency

---

# SECTION 8 — TRANSACTIONS

## 3️⃣6️⃣ Transaction kya hota hai?

Group of SQL operations

Example:

```sql
START TRANSACTION;
UPDATE employee SET salary=50000;
COMMIT;
```

---

## 3️⃣7️⃣ COMMIT kya karta hai?

Permanent save changes

---

## 3️⃣8️⃣ ROLLBACK kya karta hai?

Undo changes

---

## 3️⃣9️⃣ SAVEPOINT kya hota hai?

Checkpoint inside transaction

---

## 4️⃣0️⃣ ACID properties kya hoti hain?

| Property    | Meaning        |
| ----------- | -------------- |
| Atomicity   | all or nothing |
| Consistency | valid state    |
| Isolation   | independent    |
| Durability  | permanent      |

---

# SECTION 9 — INDEX & VIEWS

## 4️⃣1️⃣ View kya hota hai?

Virtual table

```sql
CREATE VIEW emp_view AS
SELECT name FROM employee;
```

---

## 4️⃣2️⃣ Index kyun use hota hai?

Query speed increase karta hai 🚀

---

# SECTION 10 — ADVANCED PRACTICAL QUESTIONS

## 4️⃣3️⃣ Find last record

```sql
SELECT *
FROM employee
ORDER BY id DESC
LIMIT 1;
```

---

## 4️⃣4️⃣ Find first record

```sql
SELECT *
FROM employee
ORDER BY id ASC
LIMIT 1;
```

---

## 4️⃣5️⃣ Find even rows

```sql
SELECT *
FROM employee
WHERE MOD(id,2)=0;
```

---

## 4️⃣6️⃣ Find odd rows

```sql
SELECT *
FROM employee
WHERE MOD(id,2)=1;
```

---

## 4️⃣7️⃣ Swap gender values

```sql
UPDATE employee
SET gender =
CASE
WHEN gender='Male' THEN 'Female'
WHEN gender='Female' THEN 'Male'
END;
```

---

## 4️⃣8️⃣ Find missing IDs

```sql
SELECT id+1
FROM employee
WHERE id+1 NOT IN
(
SELECT id FROM employee
);
```

---

## 4️⃣9️⃣ Difference between UNION and UNION ALL

| Command   | Removes duplicates |
| --------- | ------------------ |
| UNION     | ✅                  |
| UNION ALL | ❌                  |

---

## 5️⃣0️⃣ Difference between CHAR and VARCHAR

| Feature | CHAR   | VARCHAR  |
| ------- | ------ | -------- |
| Length  | fixed  | variable |
| Speed   | faster | slower   |
| Storage | more   | less     |

---

# 🎯 MOST IMPORTANT FINAL INTERVIEW REVISION LIST

Yaad rakhne layak top concepts:

```
2nd highest salary
duplicates detect/remove
joins difference
rank vs dense_rank
group by vs having
primary vs foreign key
delete vs truncate vs drop
transactions (commit rollback)
normalization (1NF 2NF 3NF)
indexes improve performance
```

---

Agar tum **SQL practice dataset + 25 hands-on exercises (step-by-step solve karne ke liye)** chahte ho, to main next module bana deta hoon — jo interview preparation ko aur strong karega 💪
