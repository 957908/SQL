# 🎯 Level 01: SQL Fundamentals Interview & Placement Prep

This prep sheet covers the most common interview questions, syntax traps, and placement coding problems for SQL fundamentals.

---

## 1. Top Interview Questions & Answers

### Q1: What is the difference between DDL and DML commands in SQL?
* **How to answer**: Explain the definitions, list the commands for both, and highlight the transaction rollback behavior.
* **Answer**:
  "**DDL (Data Definition Language)** commands are used to define or alter the database structure (schema). Examples include `CREATE`, `ALTER`, `DROP`, and `TRUNCATE`. DDL changes are auto-committed, meaning they cannot be rolled back in most engines.
  
  **DML (Data Manipulation Language)** commands are used to manage data within the existing schema. Examples include `INSERT`, `SELECT`, `UPDATE`, and `DELETE`. DML changes can be rolled back inside transactions."

### Q2: What is the difference between `DELETE` and `TRUNCATE`?
* **How to answer**: This is a classic placement trap. Compare them on speed, command type (DDL vs. DML), logging, and transaction rollback.
* **Answer**:
  * **`DELETE`**: A DML command. It deletes rows one-by-one and logs each deletion in the transaction log, making it slower. You can use a `WHERE` clause to filter deletions. It can be rolled back.
  * **`TRUNCATE`**: A DDL command. It de-allocates the data pages of the table, making it much faster. It does not log individual deletions and deletes all rows (no `WHERE` clause allowed). It reset auto-increment counters and cannot be rolled back in some legacy databases.

---

## 2. Placement Coding Challenge

### Problem Statement:
You are given a table `employees` containing worker details.
Write a query to find the names and salaries of the 3 highest-earning employees who joined after January 1st, 2026.

#### Input Schema (`employees`):
```text
+--------+--------------+---------+--------+------------+
| emp_id | name         | dept_id | salary | join_date  |
+--------+--------------+---------+--------+------------+
| 1      | Amit Sharma  | 10      | 55000  | 2026-01-15 |
| 2      | Pooja Patel  | 20      | 70000  | 2025-11-01 |
| 3      | Rohit Sen    | 10      | 65000  | 2026-03-01 |
| 4      | Neha Das     | 20      | 80000  | 2026-02-10 |
| 5      | Raj Kumar    | 10      | 45000  | 2026-04-18 |
+--------+--------------+---------+--------+------------+
```

#### Expected Output:
```text
+-----------+--------+
| name      | salary |
+-----------+--------+
| Neha Das  | 80000  |
| Rohit Sen | 65000  |
| Amit      | 55000  |
+-----------+--------+
```

#### SQL Query Solution:
```sql
SELECT name, salary
FROM employees
WHERE join_date > '2026-01-01'
ORDER BY salary DESC
LIMIT 3;
```
