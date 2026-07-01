

---

# 1️⃣ SECOND HIGHEST SALARY (Most Asked Interview Question)

## Method 1 — Using LIMIT

```sql
SELECT DISTINCT salary
FROM employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;  -- skips highest salary, returns 2nd highest
```

📌 Works in MySQL / PostgreSQL

---

## Method 2 — Using Subquery

```sql
SELECT MAX(salary)
FROM employee
WHERE salary <
(
    SELECT MAX(salary)
    FROM employee
);  -- returns 2nd highest salary
```

---

# 2️⃣ THIRD HIGHEST SALARY

```sql
SELECT DISTINCT salary
FROM employee
ORDER BY salary DESC
LIMIT 1 OFFSET 2;  -- skips first two salaries
```

---

# 3️⃣ FIND NTH HIGHEST SALARY (Dynamic)

```sql
SELECT DISTINCT salary
FROM employee e1
WHERE 2 =
(
    SELECT COUNT(DISTINCT salary)
    FROM employee e2
    WHERE e2.salary > e1.salary
);
```

📌 Replace `2` with `N-1`

---

# 4️⃣ FIND DUPLICATE RECORDS

```sql
SELECT name, COUNT(*)
FROM employee
GROUP BY name
HAVING COUNT(*) > 1;  -- returns duplicate names
```

---

# 5️⃣ DELETE DUPLICATE RECORDS

```sql
DELETE e1
FROM employee e1
JOIN employee e2
ON e1.name = e2.name
AND e1.id > e2.id;  -- keeps smallest id, deletes duplicates
```

---

# 6️⃣ FIND UNIQUE RECORDS ONLY

```sql
SELECT name
FROM employee
GROUP BY name
HAVING COUNT(*) = 1;  -- returns non-duplicate values
```

---

# 7️⃣ FIND EMPLOYEES WITH SALARY GREATER THAN AVERAGE

```sql
SELECT *
FROM employee
WHERE salary >
(
    SELECT AVG(salary)
    FROM employee
);
```

📌 Classic subquery interview problem

---

# 8️⃣ FIND EMPLOYEES WHO EARN MAX SALARY PER DEPARTMENT

```sql
SELECT dept, name, salary
FROM employee e
WHERE salary =
(
    SELECT MAX(salary)
    FROM employee
    WHERE dept = e.dept
);
```

---

# 9️⃣ FIND COUNT OF EMPLOYEES PER DEPARTMENT

```sql
SELECT dept, COUNT(*) AS total_employees
FROM employee
GROUP BY dept;
```

---

# 🔟 FIND DEPARTMENTS HAVING MORE THAN 5 EMPLOYEES

```sql
SELECT dept
FROM employee
GROUP BY dept
HAVING COUNT(*) > 5;
```

📌 HAVING filters grouped data

---

# 1️⃣1️⃣ FIND EMPLOYEES WHO JOINED LAST

```sql
SELECT *
FROM employee
WHERE join_date =
(
    SELECT MAX(join_date)
    FROM employee
);
```

---

# 1️⃣2️⃣ FIND EMPLOYEES WHO JOINED FIRST

```sql
SELECT *
FROM employee
WHERE join_date =
(
    SELECT MIN(join_date)
    FROM employee
);
```

---

# 1️⃣3️⃣ FIND TOP 3 HIGHEST SALARIES

```sql
SELECT DISTINCT salary
FROM employee
ORDER BY salary DESC
LIMIT 3;
```

---

# 1️⃣4️⃣ FIND TOTAL SALARY PER DEPARTMENT

```sql
SELECT dept, SUM(salary) AS total_salary
FROM employee
GROUP BY dept;
```

---

# 1️⃣5️⃣ FIND RUNNING TOTAL (Window Function)

```sql
SELECT name, salary,
SUM(salary) OVER (ORDER BY id) AS running_total
FROM employee;
```

📌 Running cumulative sum 📊

---

# 1️⃣6️⃣ FIND DIFFERENCE BETWEEN CURRENT AND PREVIOUS SALARY

```sql
SELECT name, salary,
salary - LAG(salary)
OVER (ORDER BY salary) AS difference
FROM employee;
```

Uses previous row value

---

# 1️⃣7️⃣ FIND HIGHEST SALARY IN EACH DEPARTMENT (Window Version)

```sql
SELECT name, dept, salary
FROM
(
    SELECT name, dept, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) rnk
    FROM employee
) t
WHERE rnk = 1;
```

📌 Uses partition-based ranking

---

# 1️⃣8️⃣ FIND ROWS WITH ODD ID

```sql
SELECT *
FROM employee
WHERE MOD(id,2) = 1;
```

---

# 1️⃣9️⃣ FIND ROWS WITH EVEN ID

```sql
SELECT *
FROM employee
WHERE MOD(id,2) = 0;
```

---

# 2️⃣0️⃣ SWAP TWO COLUMN VALUES

Example: swap male ↔ female

```sql
UPDATE employee
SET gender =
CASE
    WHEN gender = 'Male' THEN 'Female'
    WHEN gender = 'Female' THEN 'Male'
END;
```

---

# 2️⃣1️⃣ FIND GAPS IN ID SEQUENCE

```sql
SELECT id + 1 AS missing_id
FROM employee
WHERE (id + 1) NOT IN
(
    SELECT id
    FROM employee
);
```

Detect missing IDs 🔍

---

# 2️⃣2️⃣ FIND COMMON RECORDS BETWEEN TWO TABLES

```sql
SELECT name
FROM emp1
INTERSECT
SELECT name
FROM emp2;
```

📌 PostgreSQL / Oracle supported

(MySQL alternative:)

```sql
SELECT name
FROM emp1
WHERE name IN
(
    SELECT name FROM emp2
);
```

---

# 2️⃣3️⃣ FIND RECORDS PRESENT IN ONE TABLE BUT NOT OTHER

```sql
SELECT name
FROM emp1
WHERE name NOT IN
(
    SELECT name FROM emp2
);
```

---

# 2️⃣4️⃣ FIND LAST RECORD FROM TABLE

```sql
SELECT *
FROM employee
ORDER BY id DESC
LIMIT 1;
```

---

# 2️⃣5️⃣ MOST IMPORTANT SQL INTERVIEW TRAPS 🎯

Remember these:

```
2nd highest salary → MAX() with subquery
duplicates → GROUP BY + HAVING COUNT(*) > 1
running total → SUM() OVER()
previous row → LAG()
next row → LEAD()
department ranking → PARTITION BY
HAVING filters grouped data
WHERE filters rows
RANK skips numbers
DENSE_RANK continuous ranking
ROW_NUMBER always unique
```

---

Agar tum chaho to next main **Top 50 SQL Interview Questions (with answers + logic explanation)** bhi bana deta hoon — jo placement preparation ke liye super useful hote hain 📊✨
