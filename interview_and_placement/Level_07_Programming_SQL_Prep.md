# 🎯 Level 07: Programming SQL Interview & Placement Prep

This prep sheet covers stored procedures, user-defined functions, exception handling, and database triggers.

---

## 1. Top Interview Questions & Answers

### Q1: What is the main difference between a Stored Procedure and a User-Defined Function (UDF)?
* **How to answer**: Compare transaction handling (`COMMIT`/`ROLLBACK`), return value requirements, and query execution context.
* **Answer**:
  * **Transactions**: Stored Procedures can execute transaction operations (`COMMIT`/`ROLLBACK`) inside the code block. Functions cannot manage transactions.
  * **Return Value**: Functions **must** return a single value using the `RETURN` keyword. Procedures do not need to return a value (they can use `OUT` parameters instead).
  * **Execution Context**: Functions can be called directly inside a `SELECT` statement (e.g. `SELECT get_tax(salary) FROM employees`). Procedures must be executed separately using `CALL` or `EXECUTE`.

### Q2: What is a Database Trigger? What are the differences between a Row-level and Statement-level Trigger?
* **How to answer**: Define triggers as event listeners. Then contrast row-level (runs once per modified row) with statement-level (runs once per SQL statement).
* **Answer**:
  "A Trigger is a database object that automatically executes a block of code in response to events like `INSERT`, `UPDATE`, or `DELETE` on a table.
  
  * **Row-Level Trigger (`FOR EACH ROW`)**: Executes once for every single row affected by the SQL query. If you update 100 rows, the trigger fires 100 times. It has access to the `OLD` and `NEW` row variables.
  * **Statement-Level Trigger**: Executes exactly once for the entire SQL statement, regardless of how many rows are affected. Useful for general auditing logs."

---

## 2. Placement Coding Challenge

### Problem Statement:
Write a PostgreSQL PL/pgSQL function named `calculate_tax` that takes an employee's salary as input and returns the tax amount based on these rules:
* Salary $\le$ 50000: Tax is 10%.
* Salary $>$ 50000: Tax is 20%.

#### Function Solution:
```sql
CREATE OR REPLACE FUNCTION calculate_tax(p_salary DECIMAL)
RETURNS DECIMAL
LANGUAGE plpgsql AS $$
DECLARE
    v_tax DECIMAL;
BEGIN
    IF p_salary <= 50000.00 THEN
        v_tax := p_salary * 0.10;
    ELSE
        v_tax := p_salary * 0.20;
    END IF;
    
    RETURN v_tax;
END;
$$;
```

#### Query to execute:
```sql
SELECT name, salary, calculate_tax(salary) AS tax_amount
FROM employees;
```
