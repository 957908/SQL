# 📚 Level 04: Advanced SQL (प्रगत पातळीवरील SQL)

This module covers query nesting, subqueries, temporary query expressions (CTEs), views, temporary tables, and set operations. (या मॉड्युलमध्ये आपण सबक्वेरीज, CTE, व्ह्यूज, तात्पुरते टेबल्स आणि सेट ऑपरेटर शिकणार आहोत).

---

## 1. Subqueries & Nested Queries (सबक्वेरी आणि नेस्टेड क्वेरी)

A subquery is a query nested inside another query (e.g., inside `SELECT`, `FROM`, or `WHERE`). (एका क्वेरीच्या आत लिहिलेली दुसरी क्वेरी).

```sql
-- Find employees earning more than the company average
SELECT name, salary 
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```
* **How it works (English)**: The inner query `(SELECT AVG(salary)...)` runs first to find the average salary. The outer query then filters employees earning above that calculated average.
* **हे कसे काम करते (मराठी)**: आधी कंसातील आतील क्वेरी पूर्ण होते आणि कंपनीचा सरासरी पगार शोधते. त्यानंतर बाहेरील मुख्य क्वेरी सरासरी पगारापेक्षा जास्त पगार घेणाऱ्या कर्मचाऱ्यांची नावे दाखवते.

### Correlated Subquery (परस्पर संबंधित सबक्वेरी)
A subquery that depends on the outer query's current row value. (अशी सबक्वेरी जी मुख्य बाहेरील क्वेरीच्या डेटावर अवलंबून असते).

```sql
-- Find employees earning more than their department's average
SELECT e1.name, e1.salary, e1.dept_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary) 
    FROM employees e2 
    WHERE e2.dept_id = e1.dept_id
);
```
* **How it works (English)**: For every row evaluated in the outer query (`e1`), the inner query runs to calculate the average salary for that specific employee's department (`e1.dept_id`).
* **हे कसे काम करते (मराठी)**: बाहेरील क्वेरीच्या प्रत्येक ओळीसाठी (`e1`), आतील सबक्वेरी धावते आणि त्या विशिष्ट डिपार्टमेंटच्या सरासरी पगाराची मोजणी करते आणि तुलना करून जास्त पगार घेणाऱ्यांना दाखवते.

---

## 2. Common Table Expressions (CTE)

A temporary named result set that exists only during the execution of a query. Makes complex queries readable. (तात्पुरता तयार केलेला डेटासेट, ज्यामुळे कठीण क्वेरीज वाचणे सोपे जाते).

```sql
WITH DeptAverage AS (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
INNER JOIN DeptAverage d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;
```
* **How it works (English)**: Creates a temporary result table named `DeptAverage`. We then join this virtual table to our main `employees` table to filter records.
* **हे कसे काम करते (मराठी)**: हे कमांड आधी 'DeptAverage' नावाचे एक तात्पुरते व्हर्च्युअल टेबल तयार करते. नंतर आपण या तात्पुरत्या टेबलचा वापर मुख्य टेबलसोबत जॉईन करण्यासाठी करतो, ज्यामुळे कोड अधिक सुटसुटीत वाटतो.

---

### Recursive CTE (पुनरावृत्ती होणारी CTE)
Used to query hierarchical structures (like org charts or parent-child categories). (झाडासारखे किंवा श्रेणीबद्ध स्ट्रक्चर्स शोधण्यासाठी वापरले जाते, उदा. मॅनेजर-कर्मचारी साखळी).

```sql
WITH RECURSIVE OrgChart AS (
    -- Anchor member: Start with CEO
    SELECT emp_id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member: Join with children
    SELECT e.emp_id, e.name, e.manager_id, o.level + 1
    FROM employees e
    INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT * FROM OrgChart;
```
* **How it works (English)**: Starts with the top manager (no manager). It then recursively joins the table to find direct reports, incrementing the organizational level at each step.
* **हे कसे काम करते (मराठी)**: हे कमांड पहिल्या ओळीत मुख्य बॉसला (CEO) शोधते. नंतर स्वतःशीच पुन्हा-पुन्हा जॉईन होऊन त्या बॉसच्या हाताखालील आणि त्यांच्या हाताखालील कर्मचाऱ्यांची संपूर्ण साखळी (Org Chart) स्तर क्रमाने तयार करते.

---

## 3. Views & Temporary Tables (व्ह्यूज आणि तात्पुरते टेबल्स)

### A. Views (व्हर्च्युअल टेबल)
A saved SELECT query acting as a virtual table. (साठवून ठेवलेली क्वेरी जी टेबलसारखी वापरता येते).
```sql
CREATE VIEW high_earners AS
SELECT emp_id, name, salary FROM employees WHERE salary > 80000.00;

-- Query from View
SELECT * FROM high_earners;
```
* **How it works (English)**: Saves the query structure. When you query the view, it runs the underlying query. It does not store separate physical data.
* **हे कसे काम करते (मराठी)**: हे कमांड कोणतीही नवीन फाईल तयार न करता फक्त क्वेरी साठवून ठेवते. जेव्हा तुम्ही 'high_earners' मधून सिलेक्ट करता, तेव्हा मूळ क्वेरी धावते.

### B. Temporary Tables (तात्पुरते टेबल)
A physical table that is deleted automatically when the session closes. (सेशन संपताच आपोआप नष्ट होणारे टेबल).
```sql
CREATE TEMPORARY TABLE temp_salaries AS
SELECT dept_id, SUM(salary) AS total_sal FROM employees GROUP BY dept_id;
```

---

## 4. Set Operators: UNION, INTERSECT, EXCEPT

Set operators combine the outputs of two distinct queries. (दोन स्वतंत्र क्वेरींचे रिझल्ट्स एकत्र करण्यासाठी).

```sql
-- UNION (Removes duplicates)
SELECT name FROM employees_mumbai
UNION
SELECT name FROM employees_pune;

-- UNION ALL (Keeps duplicates - Faster!)
SELECT name FROM employees_mumbai
UNION ALL
SELECT name FROM employees_pune;

-- INTERSECT (Common records only)
SELECT name FROM employees_mumbai
INTERSECT
SELECT name FROM employees_pune;

-- EXCEPT / MINUS (In A but not in B)
SELECT name FROM employees_mumbai
EXCEPT
SELECT name FROM employees_pune;
```
* **How it works (English)**: `UNION` combines rows and removes duplicates. `UNION ALL` retains all rows. `INTERSECT` returns only common elements. `EXCEPT` returns records present in the first table but not in the second.
* **हे कसे काम करते (मराठी)**: `UNION` दोन्ही याद्यांमधील युनिक नावे एकत्र करते. `UNION ALL` कोणतीही नावे न वगळता सर्व नावे एकत्र करते (हे अधिक वेगवान आहे). `INTERSECT` दोन्ही याद्यांमध्ये समान असलेली नावे शोधते. `EXCEPT` पहिल्या यादीत आहेत पण दुसऱ्या यादीत नाहीत अशी नावे शोधते.
