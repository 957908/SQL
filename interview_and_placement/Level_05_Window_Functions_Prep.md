# 🎯 Level 05: Window Functions Interview & Placement Prep

This prep sheet covers analytical queries, ranking partitions, and lag/lead offset analyses.

---

## 1. Top Interview Questions & Answers

### Q1: Compare `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`. What happens when duplicate values are present?
* **How to answer**: Explain the numbering patterns using a hypothetical list of values (e.g. 100, 100, 90).
* **Answer**:
  * **`ROW_NUMBER()`**: Assigns a unique sequential number to each row, ignoring duplicates.
    * *Values*: `100, 100, 90` $\rightarrow$ *Row Numbers*: `1, 2, 3`.
  * **`RANK()`**: Assigns the same rank to duplicates, and skips the next ranks based on the count of duplicates.
    * *Values*: `100, 100, 90` $\rightarrow$ *Ranks*: `1, 1, 3` (rank 2 is skipped).
  * **`DENSE_RANK()`**: Assigns the same rank to duplicates, but does not skip any ranks.
    * *Values*: `100, 100, 90` $\rightarrow$ *Dense Ranks*: `1, 1, 2` (no rank skipped).

### Q2: What is the difference between `LAG()` and `LEAD()`? Provide a real-world scenario.
* **How to answer**: Explain time offsets. `LAG` accesses past records, `LEAD` accesses future records.
* **Answer**:
  * **`LAG(column, offset)`**: Accesses a row at a specific offset preceding (before) the current row. Used to compare monthly sales growth against the previous month.
  * **`LEAD(column, offset)`**: Accesses a row at a specific offset succeeding (after) the current row. Used to compare a user's transaction time to their next transaction time to detect fraud.

---

## 2. Placement Coding Challenge

### Problem Statement:
Write a query to find the **second highest salary** in the `employees` table without using `LIMIT` or `OFFSET`. (Note: If multiple employees share the highest salary, the second highest must be distinct).

#### Input Schema (`employees`):
```text
+--------+-------+--------+
| emp_id | name  | salary |
+--------+-------+--------+
| 1      | Amit  | 80000  |
| 2      | Puja  | 80000  |
| 3      | Rohit | 70000  |
| 4      | Neha  | 60000  |
+--------+-------+--------+
```

#### Expected Output:
```text
+--------+
| salary |
+--------+
| 70000  |
+--------+
```

#### SQL Query Solution:
```sql
WITH SalaryRanks AS (
    SELECT salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT DISTINCT salary
FROM SalaryRanks
WHERE rnk = 2;
```
