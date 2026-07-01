

# 📌 QUERY OPTIMIZATION CASE STUDIES (REAL INTERVIEW STYLE)

Ye section batata hai:

```text
Slow query kaise identify karte hain
EXPLAIN kaise read karte hain
Index kab lagana chahiye
Query rewrite kab karna chahiye
```

---

# 1️⃣ CASE STUDY — FULL TABLE SCAN PROBLEM

## Slow Query

```sql
SELECT *
FROM employee
WHERE name = 'Rahul';
```

Problem:

```text
Index nahi hai → full table scan
type = ALL
```

## Solution

```sql
CREATE INDEX idx_employee_name
ON employee(name);
```

Optimized Query Result:

```text
type = ref
execution faster
```

---

# 2️⃣ CASE STUDY — FUNCTION ON INDEXED COLUMN

## Slow Query

```sql
SELECT *
FROM employee
WHERE UPPER(name) = 'RAHUL';
```

Problem:

```text
Function index disable kar deta hai
Index use nahi hota
```

## Optimized Query

```sql
SELECT *
FROM employee
WHERE name = 'Rahul';
```

Result:

```text
Index used successfully
```

---

# 3️⃣ CASE STUDY — SELECT * PERFORMANCE ISSUE

## Slow Query

```sql
SELECT *
FROM employee;
```

Problem:

```text
Unnecessary columns load ho rahe hain
Memory usage high
Execution slow
```

## Optimized Query

```sql
SELECT id, name
FROM employee;
```

Result:

```text
Less memory usage
Faster execution
```

---

# 4️⃣ CASE STUDY — ORDER BY WITHOUT INDEX

## Slow Query

```sql
SELECT *
FROM employee
ORDER BY salary;
```

EXPLAIN output:

```text
Using filesort
```

## Solution

```sql
CREATE INDEX idx_salary
ON employee(salary);
```

Result:

```text
Filesort removed
Sorting faster
```

---

# 5️⃣ CASE STUDY — JOIN WITHOUT INDEX

## Slow Query

```sql
SELECT *
FROM employee e
JOIN department d
ON e.dept_id = d.id;
```

Problem:

```text
Join column indexed nahi hai
Large dataset scan ho raha hai
```

## Solution

```sql
CREATE INDEX idx_dept_id
ON employee(dept_id);
```

Result:

```text
Join optimized
Execution faster
```

---

# 6️⃣ CASE STUDY — IN vs EXISTS PERFORMANCE

## Slow Query

```sql
SELECT *
FROM employee
WHERE dept_id IN
(
SELECT id FROM department
);
```

Problem:

```text
Large subquery result slow ho sakta hai
```

## Optimized Query

```sql
SELECT *
FROM employee e
WHERE EXISTS
(
SELECT 1
FROM department d
WHERE e.dept_id = d.id
);
```

Result:

```text
Stops scanning early
Better performance
```

---

# 7️⃣ CASE STUDY — RANGE FILTER WITHOUT INDEX

## Slow Query

```sql
SELECT *
FROM employee
WHERE salary BETWEEN 30000 AND 60000;
```

Problem:

```text
No index on salary column
Full scan possible
```

## Solution

```sql
CREATE INDEX idx_salary
ON employee(salary);
```

Result:

```text
Range scan instead of full scan
```

---

# 8️⃣ CASE STUDY — GROUP BY SLOW QUERY

## Slow Query

```sql
SELECT dept, COUNT(*)
FROM employee
GROUP BY dept;
```

Problem:

```text
Grouping large dataset slow
```

## Solution

```sql
CREATE INDEX idx_dept
ON employee(dept);
```

Result:

```text
Grouping optimized
```

---

# 9️⃣ CASE STUDY — MULTI-COLUMN FILTER OPTIMIZATION

## Slow Query

```sql
SELECT *
FROM employee
WHERE dept = 'IT'
AND salary = 50000;
```

Problem:

```text
Single-column indexes inefficient
```

## Solution

```sql
CREATE INDEX idx_dept_salary
ON employee(dept, salary);
```

Result:

```text
Composite index used
Query faster
```

---

# 🔟 CASE STUDY — SUBQUERY PERFORMANCE ISSUE

## Slow Query

```sql
SELECT *
FROM employee
WHERE salary >
(
SELECT AVG(salary)
FROM employee
);
```

Problem:

```text
Subquery repeatedly execute ho sakti hai
```

## Optimized Query

```sql
SELECT *
FROM employee e
JOIN
(
SELECT AVG(salary) avg_salary
FROM employee
) temp
ON e.salary > temp.avg_salary;
```

Result:

```text
Single calculation
Better execution
```

---

# 1️⃣1️⃣ CASE STUDY — TOO MANY ROWS SCANNED

## Identify Problem

Run:

```sql
EXPLAIN SELECT *
FROM employee
WHERE dept='HR';
```

Output:

```text
rows = 100000
type = ALL
```

## Solution

```sql
CREATE INDEX idx_dept
ON employee(dept);
```

Result:

```text
rows reduced drastically
```

---

# 1️⃣2️⃣ CASE STUDY — TEMPORARY TABLE ISSUE

## Slow Query

```sql
SELECT dept, COUNT(*)
FROM employee
GROUP BY dept
ORDER BY salary;
```

EXPLAIN:

```text
Using temporary
Using filesort
```

## Solution

```sql
CREATE INDEX idx_dept_salary
ON employee(dept, salary);
```

Result:

```text
Temporary table avoided
```

---

# 1️⃣3️⃣ CASE STUDY — LIMIT OPTIMIZATION

## Slow Query

```sql
SELECT *
FROM employee;
```

## Optimized Query

```sql
SELECT *
FROM employee
LIMIT 10;
```

Result:

```text
Only required rows fetched
Execution faster
```

---

# 1️⃣4️⃣ CASE STUDY — COVERING INDEX OPTIMIZATION

## Query

```sql
SELECT name
FROM employee
WHERE name='Rahul';
```

## Index

```sql
CREATE INDEX idx_name
ON employee(name);
```

EXPLAIN output:

```text
Using index
```

Meaning:

```text
Table access avoided
Only index used
```

Fastest lookup type ⚡

---

# 1️⃣5️⃣ CASE STUDY — DENORMALIZATION FOR REPORTING

Problem query:

```sql
SELECT e.name, d.dept_name
FROM employee e
JOIN department d
ON e.dept_id=d.id;
```

Repeated joins slow ho sakte hain

## Solution

Add column:

```text
dept_name directly employee table me store karo
```

Result:

```text
Join avoided
Reporting faster
```

---

# 🎯 MOST IMPORTANT INTERVIEW OPTIMIZATION RULES

Yaad rakhne layak checklist:

```text
Always check EXPLAIN output
Avoid SELECT *
Use indexes on WHERE columns
Use composite index for multi-column filters
Avoid functions on indexed columns
Use EXISTS instead of IN (large datasets)
Optimize joins using indexes
Avoid temporary tables and filesort
Use covering indexes when possible
Limit result size using LIMIT


✅ **Database Design Case Studies (ER → Tables → Keys → Normalization → Index strategy step-by-step)** — jo system design rounds me directly poocha jaata hai.
