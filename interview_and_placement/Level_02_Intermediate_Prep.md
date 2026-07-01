# 🎯 Level 02: Intermediate SQL Interview & Placement Prep

This prep sheet covers intermediate-level aggregate functions, logical filters, grouping queries, and NULL logic.

---

## 1. Top Interview Questions & Answers

### Q1: What is the difference between the `WHERE` clause and the `HAVING` clause?
* **How to answer**: Explain the execution order of SQL queries. `WHERE` filters rows before grouping; `HAVING` filters groups after grouping.
* **Answer**:
  * **`WHERE`**: Filters individual rows of data *before* they are grouped using `GROUP BY`. It cannot contain aggregate functions (e.g. `WHERE SUM(sales) > 100` is invalid).
  * **`HAVING`**: Filters summarized groups *after* the `GROUP BY` clause is evaluated. It can contain aggregate functions (e.g. `HAVING SUM(sales) > 100` is valid).

### Q2: Why does `SELECT * FROM table WHERE column = NULL` not return any records even if NULL values exist?
* **How to answer**: Explain that `NULL` represents a missing or unknown state in SQL, not a value. Standard comparison operators cannot evaluate it.
* **Answer**:
  "In SQL, `NULL` is not a value; it represents the absence of value (unknown state). Therefore, comparing it using the equals operator (`= NULL`) evaluates to `UNKNOWN` instead of `TRUE`. To find rows containing NULL values, we must use the special syntax **`IS NULL`** or **`IS NOT NULL`**."

---

## 2. Placement Coding Challenge

### Problem Statement:
Find all departments in the company that employ more than 1 worker, and calculate the average salary of each department. Exclude the 'HR' department from the query entirely.

#### Input Schema (`employees`):
```text
+--------+------------+------------+--------+
| emp_id | name       | department | salary |
+--------+------------+------------+--------+
| 101    | Amit       | IT         | 60000  |
| 102    | Puja       | IT         | 70000  |
| 103    | Rohit      | Sales      | 50000  |
| 104    | Rahul      | HR         | 45000  |
| 105    | Neha       | Sales      | 55000  |
+--------+------------+------------+--------+
```

#### Expected Output:
```text
+------------+------------+
| department | avg_salary |
+------------+------------+
| IT         | 65000.00   |
| Sales      | 52500.00   |
+------------+------------+
```

#### SQL Query Solution:
```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE department != 'HR'
GROUP BY department
HAVING COUNT(emp_id) > 1;
```
