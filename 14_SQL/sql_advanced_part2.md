

---

# 1️⃣ STORED PROCEDURES (Reusable SQL Logic)

Stored Procedure = database ke andar stored reusable program.

## Create Stored Procedure

```sql
DELIMITER $$

CREATE PROCEDURE GetEmployees()
BEGIN
    SELECT * FROM employee;  -- returns all employee records
END $$

DELIMITER ;
```

### Run Stored Procedure

```sql
CALL GetEmployees();  -- execute stored procedure
```

📌 Use when:

* same query repeatedly run karni ho
* business logic database level par store karna ho

---

## Stored Procedure with Parameter

```sql
DELIMITER $$

CREATE PROCEDURE GetEmployeeById(IN emp_id INT)
BEGIN
    SELECT * FROM employee
    WHERE id = emp_id;  -- filter record using input parameter
END $$

DELIMITER ;
```

Execute:

```sql
CALL GetEmployeeById(2);  -- returns employee with id = 2
```

⭐ Exam trap: `IN`, `OUT`, `INOUT` parameter types

---

# 2️⃣ TRIGGERS (Automatic Event Execution)

Trigger automatically run hota hai jab:

* INSERT
* UPDATE
* DELETE

execute hota hai.

---

## BEFORE INSERT Trigger Example

```sql
DELIMITER $$

CREATE TRIGGER before_insert_employee
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    SET NEW.salary = NEW.salary + 1000;  -- automatically increase salary before insert
END $$

DELIMITER ;
```

Example:

```sql
INSERT INTO employee VALUES(5,'Amit',40000);
```

Stored salary becomes:

```sql
41000
```

---

## AFTER INSERT Trigger Example

```sql
DELIMITER $$

CREATE TRIGGER after_insert_employee
AFTER INSERT ON employee
FOR EACH ROW
BEGIN
    INSERT INTO employee_log(emp_id)
    VALUES(NEW.id);  -- log inserted employee id
END $$

DELIMITER ;
```

📌 NEW keyword = inserted row

---

## DELETE Trigger Example

```sql
DELIMITER $$

CREATE TRIGGER after_delete_employee
AFTER DELETE ON employee
FOR EACH ROW
BEGIN
    INSERT INTO delete_log(emp_id)
    VALUES(OLD.id);  -- store deleted employee id
END $$

DELIMITER ;
```

📌 OLD keyword = deleted row

---

# 3️⃣ TRANSACTIONS (ACID PROPERTIES)

Transaction = group of SQL statements executed together.

Commands:

```sql
START TRANSACTION;
```

Example:

```sql
START TRANSACTION;

UPDATE employee
SET salary = salary - 5000
WHERE id = 1;  -- deduct salary

UPDATE employee
SET salary = salary + 5000
WHERE id = 2;  -- transfer salary to another employee

COMMIT;  -- permanently save changes
```

---

## ROLLBACK Example

```sql
START TRANSACTION;

UPDATE employee
SET salary = salary - 5000
WHERE id = 1;

ROLLBACK;  -- undo changes
```

📌 Undo transaction

---

## SAVEPOINT Example

```sql
START TRANSACTION;

SAVEPOINT A;  -- create checkpoint

UPDATE employee
SET salary = 60000
WHERE id = 1;

ROLLBACK TO A;  -- rollback to checkpoint only
```

---

# 4️⃣ ACID PROPERTIES (Transaction Theory)

| Property    | Meaning                  |
| ----------- | ------------------------ |
| Atomicity   | All or nothing           |
| Consistency | Valid data state         |
| Isolation   | Independent transactions |
| Durability  | Permanent storage        |

⭐ Very common interview question

---

# 5️⃣ NORMALIZATION (Database Design Optimization)

Normalization removes:

* redundancy
* anomalies
* duplicate data

---

## 1NF (First Normal Form)

Rules:

```text
No repeating columns
Atomic values only
Primary key required
```

Example ❌

| id | phones  |
| -- | ------- |
| 1  | 111,222 |

Example ✅

| id | phone |
| -- | ----- |
| 1  | 111   |
| 1  | 222   |

---

## 2NF (Second Normal Form)

Rules:

```text
Must satisfy 1NF
No partial dependency
```

Example ❌

| order_id | product_id | product_name |

Problem:

```text
product_name depends only on product_id
```

Solution:

Split table

---

## 3NF (Third Normal Form)

Rules:

```text
Must satisfy 2NF
No transitive dependency
```

Example ❌

| emp_id | dept_id | dept_name |

Problem:

```text
dept_name depends on dept_id
```

Solution:

Separate department table

---

# 6️⃣ WINDOW FUNCTIONS (Most Important Advanced SQL)

Window functions operate on row groups without collapsing rows.

---

## ROW_NUMBER()

```sql
SELECT name, salary,
ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank_num
FROM employee;
```

Adds row number ranking

Example:

| name | salary | rank_num |
| ---- | ------ | -------- |
| Amit | 90000  | 1        |

---

## RANK()

```sql
SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) AS rank_value
FROM employee;
```

Same salary = same rank

Example:

| salary | rank |
| ------ | ---- |
| 90000  | 1    |
| 90000  | 1    |
| 80000  | 3    |

---

## DENSE_RANK()

```sql
SELECT name, salary,
DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_value
FROM employee;
```

No rank gaps

Example:

| salary | rank |
| ------ | ---- |
| 90000  | 1    |
| 90000  | 1    |
| 80000  | 2    |

⭐ Difference: RANK skips numbers, DENSE_RANK does not

---

## PARTITION BY Example

```sql
SELECT name, dept, salary,
ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank
FROM employee;
```

Each department gets separate ranking

Example:

HR ranking separate
IT ranking separate

---

# 7️⃣ LEAD FUNCTION

Access next row value

```sql
SELECT name, salary,
LEAD(salary) OVER (ORDER BY salary) AS next_salary
FROM employee;
```

---

# 8️⃣ LAG FUNCTION

Access previous row value

```sql
SELECT name, salary,
LAG(salary) OVER (ORDER BY salary) AS previous_salary
FROM employee;
```

---

# 9️⃣ NTILE FUNCTION

Divide rows into equal groups

```sql
SELECT name, salary,
NTILE(4) OVER (ORDER BY salary) AS bucket
FROM employee;
```

Creates 4 salary groups

---

# 🔟 MOST IMPORTANT EXAM TRAPS 🎯

Remember:

```text
Stored procedure = reusable SQL block
Trigger = automatic execution
Commit = save changes
Rollback = undo changes
Savepoint = partial rollback checkpoint
1NF removes repeating columns
2NF removes partial dependency
3NF removes transitive dependency
ROW_NUMBER unique ranking
RANK skips numbers
DENSE_RANK continuous ranking
```

---

Agar tum **SQL Interview Scenario Questions (real-world queries like 2nd highest salary, duplicate rows find, gaps detect, running totals)** chahte ho, wo Part-3 me cover kar dete hain — placement ke liye extremely important hota hai 💼
