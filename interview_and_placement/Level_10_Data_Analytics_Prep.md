# 🎯 Level 10: SQL for Data Analytics Interview & Placement Prep

This prep sheet covers pivot queries, string/date cleaning, cohort analysis, and placement coding problems for business analytics.

---

## 1. Top Interview Questions & Answers

### Q1: Explain how you would perform a Pivot operation in databases that do not support the native `PIVOT` function.
* **How to answer**: Explain the conditional aggregation pattern. You use `SUM(CASE WHEN ...)` or `MAX(CASE WHEN ...)` grouped by the pivot category.
* **Answer**:
  "In database engines (like PostgreSQL) that do not support a native `PIVOT` operator, we can pivot row values into columns using **Conditional Aggregation**. 
  
  We write a `CASE` statement inside an aggregate function (typically `SUM` or `MAX`) for each target column we want to create, and group by the row category:
  ```sql
  SELECT department,
         SUM(CASE WHEN year = 2025 THEN revenue ELSE 0 END) AS revenue_2025,
         SUM(CASE WHEN year = 2026 THEN revenue ELSE 0 END) AS revenue_2026
  FROM sales
  GROUP BY department;
  ```
  This evaluates the conditions, filters values per year, and summarizes them into dedicated columns."

### Q2: What is Cohort Analysis, and why is it useful for business KPI reporting?
* **How to answer**: Explain that a cohort is a group of users sharing a common characteristic (e.g. signup month). Cohort analysis tracks their retention and purchasing behaviors over time to measure churn and customer lifetime value.
* **Answer**:
  "Cohort Analysis is a method where users are grouped into cohorts based on a shared starting event and time window (e.g. users who signed up in 'January 2026'). 
  
  By tracking the retention and purchasing behaviors of these cohorts month-over-month, businesses can analyze Key Performance Indicators (KPIs) like customer retention decay, lifetime value (LTV), and churn rates. It helps determine if newer cohorts are more active than older ones, which is critical for evaluating product changes or marketing campaigns."

---

## 2. Placement Coding Challenge (KPI Reporting)

### Problem Statement:
Write a query to calculate the **Month-over-Month (MoM) revenue growth percentage** for the company.
Display the month, the current month's revenue, the previous month's revenue, and the growth rate rounded to 2 decimal places.

#### Input Schema (`orders`):
```text
+----------+------------+--------+
| order_id | order_date | amount |
+----------+------------+--------+
| 1        | 2026-01-10 | 1000   |
| 2        | 2026-01-15 | 2000   |
| 3        | 2026-02-05 | 4500   |
| 4        | 2026-02-28 | 1500   |
| 5        | 2026-03-12 | 9000   |
+----------+------------+--------+
```

#### Expected Output:
```text
+-------------+---------+--------------+----------------+
| order_month | revenue | prev_revenue | growth_percent |
+-------------+---------+--------------+----------------+
| 1           | 3000.00 | NULL         | NULL           |
| 2           | 6000.00 | 3000.00      | 100.00         |
| 3           | 9000.00 | 6000.00      | 50.00          |
+-------------+---------+--------------+----------------+
```

#### SQL Query Solution:
```sql
WITH MonthlySales AS (
    SELECT EXTRACT(MONTH FROM order_date) AS order_month,
           SUM(amount) AS revenue
    FROM orders
    GROUP BY EXTRACT(MONTH FROM order_date)
)
SELECT 
    order_month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY order_month) AS prev_revenue,
    ROUND(
        ((revenue - LAG(revenue, 1) OVER (ORDER BY order_month)) / 
        LAG(revenue, 1) OVER (ORDER BY order_month)) * 100, 
        2
    ) AS growth_percent
FROM MonthlySales;
```
