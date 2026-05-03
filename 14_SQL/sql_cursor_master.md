
```sql
14_SQL/sql_cursor_master.md
```

---

# 📌 SQL CURSOR MASTER HANDBOOK

Cursor = result set ko **row-by-row process karne ka mechanism**

Normally SQL:

```sql
SELECT * FROM employee;
```

Returns:

```text
All rows together
```

Cursor:

```text
Row 1 process
Row 2 process
Row 3 process
```
Achha 👍 matlab jo **Cursor wala content maine pehle diya tha** tumne already GitHub me daal diya hai — perfect.

Ab next step ye hota hai ki us file ko **aur strong banaya jaye (advanced cursor programs + exam-style examples)** taaki tumhara SQL module complete lage, especially agar tum **placement / CDAC / Big Data prep repo** bana rahe ho.

Main tumhe **additional cursor programs (jo pehle wale me nahi the)** de raha hoon — ye tum same file me *append* kar sakte ho.

---

# 📌 CURSOR ADVANCED PROGRAMS (ADD THESE NEXT)

Add under section:

```text
ADVANCED CURSOR PROGRAMS
```

---

# 1️⃣ Cursor Program — Count Employees Row-by-Row

```sql
DELIMITER $$

CREATE PROCEDURE count_employees()

BEGIN

DECLARE empid INT;
DECLARE finished INT DEFAULT FALSE;
DECLARE total INT DEFAULT 0;

DECLARE emp_cursor CURSOR FOR
SELECT id FROM employee;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;

OPEN emp_cursor;

read_loop: LOOP

FETCH emp_cursor INTO empid;

IF finished THEN
LEAVE read_loop;
END IF;

SET total = total + 1;  -- increment counter

END LOOP;

CLOSE emp_cursor;

SELECT total;  -- display total employee count

END $$

DELIMITER ;
```

---

# 2️⃣ Cursor Program — Display Employees With Low Salary

Condition:

salary < 50000

```sql
DELIMITER $$

CREATE PROCEDURE low_salary_employees()

BEGIN

DECLARE empid INT;
DECLARE empsalary INT;
DECLARE done INT DEFAULT FALSE;

DECLARE emp_cursor CURSOR FOR
SELECT id, salary FROM employee;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN emp_cursor;

read_loop: LOOP

FETCH emp_cursor INTO empid, empsalary;

IF done THEN
LEAVE read_loop;
END IF;

IF empsalary < 50000 THEN

SELECT empid, empsalary;  -- print low salary employees

END IF;

END LOOP;

CLOSE emp_cursor;

END $$

DELIMITER ;
```

---

# 3️⃣ Cursor Program — Department-wise Salary Increment

Condition:

IT department → +3000 salary

```sql
DELIMITER $$

CREATE PROCEDURE increment_it_salary()

BEGIN

DECLARE empid INT;
DECLARE finished INT DEFAULT FALSE;

DECLARE dept_cursor CURSOR FOR
SELECT id FROM employee
WHERE dept = 'IT';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;

OPEN dept_cursor;

read_loop: LOOP

FETCH dept_cursor INTO empid;

IF finished THEN
LEAVE read_loop;
END IF;

UPDATE employee
SET salary = salary + 3000
WHERE id = empid;

END LOOP;

CLOSE dept_cursor;

END $$

DELIMITER ;
```

---

# 4️⃣ Cursor Program — Copy Data Into Another Table

Example:

employee → employee_backup

```sql
DELIMITER $$

CREATE PROCEDURE backup_employee()

BEGIN

DECLARE empid INT;
DECLARE empname VARCHAR(50);
DECLARE done INT DEFAULT FALSE;

DECLARE emp_cursor CURSOR FOR
SELECT id, name FROM employee;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN emp_cursor;

read_loop: LOOP

FETCH emp_cursor INTO empid, empname;

IF done THEN
LEAVE read_loop;
END IF;

INSERT INTO employee_backup
VALUES(empid, empname);

END LOOP;

CLOSE emp_cursor;

END $$

DELIMITER ;
```

---

# 5️⃣ Cursor Program — Delete Employees With Low Salary

Condition:

salary < 20000

```sql
DELIMITER $$

CREATE PROCEDURE delete_low_salary()

BEGIN

DECLARE empid INT;
DECLARE done INT DEFAULT FALSE;

DECLARE emp_cursor CURSOR FOR
SELECT id FROM employee
WHERE salary < 20000;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN emp_cursor;

read_loop: LOOP

FETCH emp_cursor INTO empid;

IF done THEN
LEAVE read_loop;
END IF;

DELETE FROM employee
WHERE id = empid;

END LOOP;

CLOSE emp_cursor;

END $$

DELIMITER ;
```

---

# 📌 Recommended GitHub Structure (for your SQL module)

Since tum already cursor file add kar chuke ho, best structure aisa rakho:

```
SQL/
│
├── sql_basic_commands.md
├── sql_advanced_part2.md
├── sql_advanced_part3.md
├── sql_window_functions.md
├── sql_stored_procedures.md
├── sql_triggers.md
├── sql_transactions.md
├── sql_normalization.md
└── sql_cursor_master.md
```


---



---

# 1️⃣ CURSOR KAB USE KARTE HAIN?

Use cursor when:

```text
Row-by-row processing required
Conditional updates per row
Stored procedure loops required
Batch processing logic needed
```

Avoid cursor when:

```text
Simple SELECT possible
Bulk UPDATE possible
Set-based query possible
```

Because cursor slower hota hai ⚠️

---

# 2️⃣ CURSOR LIFECYCLE (VERY IMPORTANT EXAM QUESTION)

Steps:

```text
DECLARE → OPEN → FETCH → CLOSE
```

Yaad rakhna compulsory 🎯

---

# 3️⃣ SIMPLE CURSOR EXAMPLE (SALARY PRINT)

```sql
DECLARE emp_salary INT;  -- variable to store salary
DECLARE done INT DEFAULT FALSE;  -- loop exit flag

DECLARE emp_cursor CURSOR FOR
SELECT salary FROM employee;  -- cursor query

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN emp_cursor;  -- start cursor

read_loop: LOOP

FETCH emp_cursor INTO emp_salary;  -- fetch salary row-by-row

IF done THEN
LEAVE read_loop;  -- exit loop when rows finished
END IF;

SELECT emp_salary;  -- process each salary

END LOOP;

CLOSE emp_cursor;  -- release memory
```

---

# 4️⃣ CURSOR WITH STORED PROCEDURE

Example: employee IDs print karna

```sql
DELIMITER $$

CREATE PROCEDURE cursor_example()

BEGIN

DECLARE emp_id INT;
DECLARE finished INT DEFAULT 0;

DECLARE emp_cursor CURSOR FOR
SELECT id FROM employee;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

OPEN emp_cursor;

read_loop: LOOP

FETCH emp_cursor INTO emp_id;

IF finished = 1 THEN
LEAVE read_loop;
END IF;

SELECT emp_id;  -- display id row-by-row

END LOOP;

CLOSE emp_cursor;

END $$

DELIMITER ;
```

Run procedure:

```sql
CALL cursor_example();
```

---

# 5️⃣ CURSOR PROGRAM — SALARY INCREMENT

Example: har employee ki salary +1000

```sql
DELIMITER $$

CREATE PROCEDURE increase_salary()

BEGIN

DECLARE empid INT;
DECLARE done INT DEFAULT FALSE;

DECLARE salary_cursor CURSOR FOR
SELECT id FROM employee;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN salary_cursor;

read_loop: LOOP

FETCH salary_cursor INTO empid;

IF done THEN
LEAVE read_loop;
END IF;

UPDATE employee
SET salary = salary + 1000
WHERE id = empid;  -- increment salary row-by-row

END LOOP;

CLOSE salary_cursor;

END $$

DELIMITER ;
```

---

# 6️⃣ CURSOR PROGRAM — DEPARTMENT-WISE PROCESSING

Example: HR department employees update

```sql
DELIMITER $$

CREATE PROCEDURE update_hr_salary()

BEGIN

DECLARE empid INT;
DECLARE finished INT DEFAULT FALSE;

DECLARE dept_cursor CURSOR FOR
SELECT id FROM employee
WHERE dept = 'HR';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;

OPEN dept_cursor;

read_loop: LOOP

FETCH dept_cursor INTO empid;

IF finished THEN
LEAVE read_loop;
END IF;

UPDATE employee
SET salary = salary + 2000
WHERE id = empid;

END LOOP;

CLOSE dept_cursor;

END $$

DELIMITER ;
```

---

# 7️⃣ CURSOR TYPES (THEORY QUESTION)

## Implicit Cursor

Automatically created by database

Example:

```sql
UPDATE employee
SET salary = 50000
WHERE id = 1;
```

DB internally cursor use karta hai

---

## Explicit Cursor

User manually define karta hai

Example:

```sql
DECLARE emp_cursor CURSOR FOR
SELECT * FROM employee;
```

---

# 8️⃣ CURSOR HANDLER (IMPORTANT)

Handler detect karta hai:

```text
End of data
Errors
Conditions
```

Example:

```sql
DECLARE CONTINUE HANDLER FOR NOT FOUND
SET done = TRUE;
```

Means:

Rows finish ho gayi

---

# 9️⃣ CURSOR WITH MULTIPLE COLUMNS

Example:

```sql
DECLARE empname VARCHAR(50);
DECLARE empsalary INT;

DECLARE emp_cursor CURSOR FOR
SELECT name, salary FROM employee;
```

Fetch:

```sql
FETCH emp_cursor INTO empname, empsalary;
```

---

# 🔟 CURSOR WITH CONDITIONAL LOGIC

Example: salary check

```sql
IF empsalary < 50000 THEN

UPDATE employee
SET salary = salary + 5000
WHERE id = empid;

END IF;
```

Conditional update possible per row ✅

---

# 1️⃣1️⃣ CURSOR VS NORMAL SQL DIFFERENCE

| Feature    | Cursor        | Normal SQL        |
| ---------- | ------------- | ----------------- |
| Processing | Row-by-row    | All rows together |
| Speed      | Slow          | Fast              |
| Use case   | Complex logic | Simple queries    |
| Memory     | Higher        | Lower             |

---

# 1️⃣2️⃣ MOST IMPORTANT CURSOR EXAM TRAPS 🎯

Yaad rakhne layak:

```text
Cursor processes rows one-by-one
Used inside stored procedures
Explicit cursor manually declared
Implicit cursor automatic hota hai
Cursor lifecycle = Declare → Open → Fetch → Close
Handler detects end of result set
Cursor slower than normal SQL queries


Agar tum GitHub ke liye **folder structure complete SQL module ka** banana chahte ho (Basic + Advanced + Window + Cursor + Interview Queries), to main ek recommended directory layout bhi bana deta hoon 📂✨
