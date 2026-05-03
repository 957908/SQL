

```sql
14_SQL/sql_execution_plan_analysis.md
```

---

# 📌 EXECUTION PLAN KYA HOTA HAI?

Execution Plan batata hai:

```text
Database query kaise execute karega
Kaunsa index use hoga
Full table scan hoga ya nahi
Join kaunsa method use hoga
Estimated cost kitni hai
```

Command:

```sql
EXPLAIN SELECT * FROM employee WHERE id = 10;
```

---

# 1️⃣ EXPLAIN COMMAND BASIC STRUCTURE

Example:

```sql
EXPLAIN SELECT *
FROM employee
WHERE name = 'Rahul';
```

Output columns usually:

| Column        | Meaning                |
| ------------- | ---------------------- |
| id            | query step number      |
| select_type   | query type             |
| table         | table used             |
| type          | join type              |
| possible_keys | usable indexes         |
| key           | actual index used      |
| rows          | estimated rows scanned |
| Extra         | additional info        |

---

# 2️⃣ SELECT_TYPE EXPLANATION

Common values:

| Type     | Meaning                 |
| -------- | ----------------------- |
| SIMPLE   | normal query            |
| PRIMARY  | outer query             |
| SUBQUERY | inner query             |
| DERIVED  | subquery in FROM clause |
| UNION    | union query             |

Example:

```sql
SELECT * FROM employee
WHERE id IN
(
SELECT id FROM department
);
```

Inner query = SUBQUERY

---

# 3️⃣ TABLE COLUMN (IMPORTANT)

Example:

```sql
table: employee
```

Meaning:

Query employee table access karega

Multiple joins me:

```text
employee
department
salary
```

execution order samajhne me help karta hai

---

# 4️⃣ TYPE COLUMN (MOST IMPORTANT PERFORMANCE INDICATOR)

Ye batata hai query fast hai ya slow

| Type   | Speed                 |
| ------ | --------------------- |
| system | fastest               |
| const  | very fast             |
| eq_ref | fast                  |
| ref    | good                  |
| range  | acceptable            |
| index  | slow                  |
| ALL    | very slow ❌ full scan |

Example slow query:

```sql
EXPLAIN SELECT *
FROM employee;
```

Output:

```text
type = ALL
```

Meaning:

Full table scan

---

# 5️⃣ POSSIBLE_KEYS COLUMN

Example:

```text
possible_keys = idx_name
```

Meaning:

Database ke paas index available hai

But confirm nahi ki use hoga

---

# 6️⃣ KEY COLUMN (ACTUAL INDEX USED)

Example:

```text
key = idx_name
```

Meaning:

Index actually use ho raha hai ✅

Example:

```sql
CREATE INDEX idx_name
ON employee(name);
```

---

# 7️⃣ ROWS COLUMN

Example:

```text
rows = 5000
```

Meaning:

Database estimate karta hai 5000 rows scan hongi

Smaller number = faster query

---

# 8️⃣ EXTRA COLUMN (VERY IMPORTANT)

Common values:

| Extra           | Meaning              |
| --------------- | -------------------- |
| Using where     | filter applied       |
| Using index     | index-only scan      |
| Using temporary | temp table created ❌ |
| Using filesort  | sorting required ❌   |

Bad example:

```text
Using temporary
Using filesort
```

Performance slow

---

# 9️⃣ FULL TABLE SCAN IDENTIFY KARNA

Example:

```sql
EXPLAIN SELECT *
FROM employee
WHERE salary > 50000;
```

Output:

```text
type = ALL
```

Solution:

```sql
CREATE INDEX idx_salary
ON employee(salary);
```

---

# 🔟 INDEX SCAN IDENTIFY KARNA

Example:

```sql
EXPLAIN SELECT *
FROM employee
WHERE id = 10;
```

Output:

```text
type = const
```

Fast execution ✅

---

# 1️⃣1️⃣ JOIN EXECUTION PLAN ANALYSIS

Example:

```sql
EXPLAIN
SELECT *
FROM employee e
JOIN department d
ON e.dept_id = d.id;
```

Check:

```text
type column
rows column
key column
```

Optimization:

```sql
CREATE INDEX idx_dept
ON employee(dept_id);
```

---

# 1️⃣2️⃣ RANGE SCAN EXAMPLE

Example:

```sql
EXPLAIN SELECT *
FROM employee
WHERE salary BETWEEN 30000 AND 60000;
```

Output:

```text
type = range
```

Better than:

```text
ALL
```

---

# 1️⃣3️⃣ CONST TYPE (BEST PERFORMANCE)

Example:

```sql
EXPLAIN SELECT *
FROM employee
WHERE id = 5;
```

Output:

```text
type = const
```

Meaning:

Primary key lookup

Fastest access ⚡

---

# 1️⃣4️⃣ INDEX TYPE SCAN

Example:

```text
type = index
```

Meaning:

Entire index scan ho raha hai

Better than table scan

But still slow

---

# 1️⃣5️⃣ DERIVED QUERY PLAN

Example:

```sql
EXPLAIN
SELECT *
FROM
(
SELECT dept, COUNT(*)
FROM employee
GROUP BY dept
) temp;
```

Output:

```text
select_type = DERIVED
```

Temporary result table used

---

# 1️⃣6️⃣ SUBQUERY EXECUTION PLAN

Example:

```sql
EXPLAIN
SELECT *
FROM employee
WHERE salary >
(
SELECT AVG(salary)
FROM employee
);
```

Output:

```text
select_type = SUBQUERY
```

---

# 1️⃣7️⃣ FILESORT PROBLEM SOLUTION

Example slow:

```sql
EXPLAIN
SELECT *
FROM employee
ORDER BY salary;
```

Output:

```text
Using filesort
```

Fix:

```sql
CREATE INDEX idx_salary
ON employee(salary);
```

---

# 1️⃣8️⃣ TEMPORARY TABLE PROBLEM

Example:

```sql
GROUP BY dept
ORDER BY salary;
```

Output:

```text
Using temporary
```

Fix:

Composite index:

```sql
CREATE INDEX idx_dept_salary
ON employee(dept, salary);
```

---

# 1️⃣9️⃣ COVERING INDEX CONCEPT

Example:

```sql
SELECT name
FROM employee
WHERE name = 'Rahul';
```

Index:

```sql
CREATE INDEX idx_name
ON employee(name);
```

Output:

```text
Using index
```

Meaning:

Table access needed nahi

Index se hi result mil gaya ⚡

---

# 2️⃣0️⃣ COST-BASED OPTIMIZATION CONCEPT

Database choose karta hai:

```text
Best execution path
Minimum scan rows
Lowest memory usage
Lowest CPU usage
```

Example:

```text
Index scan vs full table scan
```

Database automatically best choose karta hai

---

# 🎯 MOST IMPORTANT EXECUTION PLAN INTERVIEW TRAPS

Yaad rakhna:

```text
type = ALL → slow query
type = const → fastest query
Using filesort → optimization needed
Using temporary → optimization needed
key column shows used index
rows column shows scanned rows estimate
EXPLAIN helps detect performance issues
Composite index improves multi-column filters
Primary key lookup fastest hota hai
```


✅ **SQL Query Optimization Case Studies (real slow queries ko fast banana step-by-step)** — jo interview me scenario-based questions ke liye best preparation hota hai.
