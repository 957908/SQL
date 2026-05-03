

# 📌 INDEX KYA HOTA HAI?

Index = database ka **search accelerator** (like book ka index page 📖)

Without index:

```text
Full table scan
```

With index:

```text
Direct row access
```

Result:

⚡ Faster SELECT queries

---

# 1️⃣ CREATE INDEX (BASIC)

```sql
CREATE INDEX idx_employee_name
ON employee(name);  -- speeds up search on name column
```

Use when:

```text
WHERE clause frequently use ho
JOIN frequently use ho
ORDER BY frequently use ho
```

---

# 2️⃣ CREATE UNIQUE INDEX

Duplicate values prevent karta hai

```sql
CREATE UNIQUE INDEX idx_email
ON employee(email);
```

---

# 3️⃣ COMPOSITE INDEX (MULTIPLE COLUMNS)

Multiple column search fast karta hai

```sql
CREATE INDEX idx_name_salary
ON employee(name, salary);
```

Example optimized query:

```sql
SELECT *
FROM employee
WHERE name='Rahul'
AND salary=50000;
```

---

# 4️⃣ DROP INDEX

Index remove karne ke liye

```sql
DROP INDEX idx_employee_name
ON employee;
```

---

# 5️⃣ SHOW INDEXES

Table ke indexes check karne ke liye

```sql
SHOW INDEXES FROM employee;
```

---

# 6️⃣ PRIMARY KEY INDEX

Automatically create hota hai

Example:

```sql
id INT PRIMARY KEY
```

Database internally index create karta hai

---

# 7️⃣ CLUSTERED INDEX vs NON-CLUSTERED INDEX

| Feature       | Clustered | Non-clustered   |
| ------------- | --------- | --------------- |
| Data storage  | sorted    | separate        |
| Count allowed | 1         | many            |
| Speed         | faster    | slightly slower |

Example:

```text
PRIMARY KEY = clustered index
CREATE INDEX = non-clustered index
```

---

# 8️⃣ WHEN INDEX USE NAHI KARNA CHAHIYE ⚠️

Avoid index when:

```text
Table small ho
Column frequently update hota ho
Low selectivity ho (example gender column)
```

Example bad index:

```sql
CREATE INDEX idx_gender
ON employee(gender);
```

Reason:

```text
Male/Female values repeat zyada hote hain
```

---

# 9️⃣ EXPLAIN PLAN (VERY IMPORTANT)

Query execution plan show karta hai

```sql
EXPLAIN
SELECT *
FROM employee
WHERE name='Rahul';
```

Check:

```text
Index used or not
Full scan ho raha hai ya nahi
```

Interview favorite question 🎯

---

# 🔟 FULL TABLE SCAN vs INDEX SCAN

| Scan Type       | Speed |
| --------------- | ----- |
| Full Table Scan | slow  |
| Index Scan      | fast  |

Example slow query:

```sql
SELECT *
FROM employee;
```

Example optimized query:

```sql
SELECT *
FROM employee
WHERE id=10;
```

---

# 1️⃣1️⃣ USE INDEX IN JOIN OPTIMIZATION

Slow join:

```sql
SELECT *
FROM employee e
JOIN department d
ON e.dept_id=d.id;
```

Solution:

```sql
CREATE INDEX idx_dept
ON employee(dept_id);
```

Join faster ho jayega ⚡

---

# 1️⃣2️⃣ QUERY OPTIMIZATION USING WHERE CLAUSE ORDER

Bad query:

```sql
SELECT *
FROM employee
WHERE salary+1000 > 50000;
```

Good query:

```sql
SELECT *
FROM employee
WHERE salary > 49000;
```

Reason:

```text
Index properly use hota hai
```

---

# 1️⃣3️⃣ SELECT * AVOID KARNA CHAHIYE

Bad:

```sql
SELECT *
FROM employee;
```

Good:

```sql
SELECT name, salary
FROM employee;
```

Reason:

```text
Less memory usage
Faster execution
```

---

# 1️⃣4️⃣ LIMIT USE KARO LARGE DATASET ME

Example:

```sql
SELECT *
FROM employee
LIMIT 10;
```

Performance improve karta hai

---

# 1️⃣5️⃣ EXISTS vs IN PERFORMANCE DIFFERENCE

Better:

```sql
SELECT name
FROM employee e
WHERE EXISTS
(
SELECT 1
FROM department d
WHERE e.dept_id=d.id
);
```

Faster than:

```sql
WHERE dept_id IN (...)
```

Large dataset me EXISTS better hota hai

---

# 1️⃣6️⃣ ORDER BY OPTIMIZATION

Slow:

```sql
SELECT *
FROM employee
ORDER BY salary;
```

Fast:

```sql
CREATE INDEX idx_salary
ON employee(salary);
```

---

# 1️⃣7️⃣ GROUP BY OPTIMIZATION

Example:

```sql
CREATE INDEX idx_department
ON employee(dept);
```

Optimizes:

```sql
GROUP BY dept
```

---

# 1️⃣8️⃣ COUNT(*) vs COUNT(column)

Fast:

```sql
SELECT COUNT(*)
FROM employee;
```

Slow:

```sql
SELECT COUNT(name)
FROM employee;
```

Reason:

```text
COUNT(*) uses metadata optimization
```

---

# 1️⃣9️⃣ AVOID FUNCTIONS ON INDEXED COLUMN

Bad:

```sql
SELECT *
FROM employee
WHERE UPPER(name)='RAHUL';
```

Good:

```sql
SELECT *
FROM employee
WHERE name='Rahul';
```

Reason:

```text
Function index disable kar deta hai
```

---

# 2️⃣0️⃣ USE BETWEEN INSTEAD OF MULTIPLE CONDITIONS

Bad:

```sql
salary >= 30000
AND salary <= 60000
```

Better:

```sql
salary BETWEEN 30000 AND 60000;
```

Readable + optimized

---

# 2️⃣1️⃣ QUERY CACHE CONCEPT

Database frequently executed queries cache karta hai

Example:

```sql
SELECT *
FROM employee
WHERE id=5;
```

Repeated execution faster ho jata hai

---

# 2️⃣2️⃣ NORMALIZATION vs PERFORMANCE TRADEOFF

| Normalization      | Performance    |
| ------------------ | -------------- |
| High normalization | slower joins   |
| Low normalization  | faster queries |

Solution:

```text
Use indexing + selective denormalization
```

---

# 2️⃣3️⃣ DENORMALIZATION KAB USE KARTE HAIN?

Use when:

```text
Reporting queries heavy ho
Join zyada lag rahe ho
Analytics queries run ho rahi ho
```

---

# 2️⃣4️⃣ MATERIALIZED VIEW (ADVANCED OPTIMIZATION)

Stored query result hota hai

Example:

```sql
CREATE MATERIALIZED VIEW emp_summary
AS
SELECT dept, COUNT(*)
FROM employee
GROUP BY dept;
```

Fast reporting queries

---

# 2️⃣5️⃣ MOST IMPORTANT QUERY OPTIMIZATION INTERVIEW TRAPS 🎯

Yaad rakhna:

```text
Index improves SELECT performance
Avoid SELECT *
Avoid functions on indexed columns
Use composite index for multi-column filters
Use EXPLAIN to analyze query plan
EXISTS faster than IN (large data)
Clustered index only one per table
Primary key automatically indexed
LIMIT improves performance


✅ **Execution Plan Analysis (step-by-step reading EXPLAIN output + cost-based optimization examples)** — jo senior-level interviews me poocha jaata hai.
