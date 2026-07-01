# 🎯 Level 03: Joins Interview & Placement Prep

This prep sheet covers relational database joins, Venn-diagram representations, and multi-table queries.

---

## 1. Top Interview Questions & Answers

### Q1: What is the difference between a `LEFT JOIN` and an `INNER JOIN`? Provide a concrete example.
* **How to answer**: Explain matching conditions and unmatched record outputs (NULLs vs. exclusion).
* **Answer**:
  "An `INNER JOIN` returns only the rows that have matching values in both tables. If a row in the left table does not match any row in the right table, it is excluded from the result.
  
  A `LEFT JOIN` returns **all** rows from the left table, regardless of whether a match exists in the right table. If no match exists, the columns from the right table display as `NULL`.
  
  *Example*: Joining `employees` and `departments`. An `INNER JOIN` shows only employees assigned to a department. A `LEFT JOIN` shows all employees, including new hires without a department (showing `NULL` for their department name)."

### Q2: What is a Self Join, and when would you use it in database queries?
* **How to answer**: Explain that it is a table joined with itself. Give the employee-manager hierarchy or duplicate-finding scenario as the main use case.
* **Answer**:
  "A Self Join is a normal join where a table is joined with itself. It is implemented by using aliases to create two virtual copies of the same table.
  
  We use it when a table holds hierarchical data (parent-child relationships) inside the same table, such as:
  * Matching employees to their managers (since managers are also employees in the same table).
  * Finding duplicate rows (e.g., finding customers with the same address but different IDs)."

---

## 2. Placement Coding Challenge

### Problem Statement:
Write a query to identify all departments that currently have **no employees** assigned to them. Display the department names.

#### Input Schema (`employees`):
```text
+--------+-------+---------+
| emp_id | name  | dept_id |
+--------+-------+---------+
| 1      | Amit  | 10      |
| 2      | Puja  | 20      |
+--------+-------+---------+
```

#### Input Schema (`departments`):
```text
+---------+------------+
| dept_id | dept_name  |
+---------+------------+
| 10      | IT         |
| 20      | Sales      |
| 30      | Marketing  |
+---------+------------+
```

#### Expected Output:
```text
+-----------+
| dept_name |
+-----------+
| Marketing |
+-----------+
```

#### SQL Query Solution:
```sql
SELECT d.dept_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;
```
