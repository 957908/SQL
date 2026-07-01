# 🎯 Level 04: Advanced SQL Interview & Placement Prep

This prep sheet covers nested subqueries, correlated subqueries, Common Table Expressions (CTEs), and set operations.

---

## 1. Top Interview Questions & Answers

### Q1: What is the difference between `UNION` and `UNION ALL`? Which is faster and why?
* **How to answer**: Explain duplicate handling and sorting behaviors. Highlight the performance difference.
* **Answer**:
  * **`UNION`**: Combines the result sets of two queries, eliminates duplicate rows, and sorts the final list.
  * **`UNION ALL`**: Combines the result sets of two queries and keeps all duplicate rows.
  
  **Performance**: **`UNION ALL` is significantly faster** because it does not have to perform duplicate checking or sort-merging operations in memory. It simply appends the datasets. In production, always prefer `UNION ALL` unless duplicate removal is strictly required.

### Q2: What is the difference between a Subquery and a CTE (Common Table Expression)?
* **How to answer**: Compare readability, code reuse (recursion), and execution optimization.
* **Answer**:
  * **Readability**: CTEs organize query blocks cleanly using the `WITH` clause at the top. Subqueries nested inside `FROM` or `WHERE` clauses can become hard to read.
  * **Reuse**: A CTE can be referenced multiple times within the same query. A subquery must be rewritten each time it is used.
  * **Recursion**: CTEs support recursive loops (`WITH RECURSIVE`), which is impossible with standard subqueries.
  * **Performance**: Most modern database optimizers treat both similarly under the hood.

---

## 2. Placement Coding Challenge

### Problem Statement:
Write a query using a **Common Table Expression (CTE)** to find employees who earn more than the **average salary of their respective departments**.

#### Input Schema (`employees`):
```text
+--------+-------+---------+--------+
| emp_id | name  | dept_id | salary |
+--------+-------+---------+--------+
| 1      | Amit  | 10      | 60000  |
| 2      | Puja  | 10      | 40000  |
| 3      | Rohit | 20      | 70000  |
| 4      | Neha  | 20      | 50000  |
+--------+-------+---------+--------+
```

#### Expected Output:
```text
+------+--------+---------+
| name | salary | dept_id |
+------+--------+---------+
| Amit | 60000  | 10      |
| Rohit| 70000  | 20      |
+------+--------+---------+
```

#### SQL Query Solution:
```sql
WITH DeptAverage AS (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, e.dept_id
FROM employees e
INNER JOIN DeptAverage d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_salary;
```
