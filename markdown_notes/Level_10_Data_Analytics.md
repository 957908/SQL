# 📚 Level 10: SQL for Data Analytics (डेटा विश्लेषणासाठी SQL)

This module covers writing advanced queries for data analytics, reports, string/date cleaning, pivoting datasets, and calculating business Key Performance Indicators (KPIs). (या मॉड्युलमध्ये आपण डेटावर विश्लेषण करणे जसे की रिपोर्ट बनवणे, तारीख-मजकूर स्वच्छ करणे, पिव्होट करणे आणि बिझनेस केपीआय मोजणे शिकणार आहोत).

---

## 1. Conditional Logic: CASE Statements (अटीनुसार वर्गीकरण)

Evaluates conditions and returns a value based on matching criteria (like IF-THEN-ELSE). (अटीनुसार डेटाचे गट पाडण्यासाठी किंवा वर्गीकरण करण्यासाठी).

```sql
SELECT name, salary,
       CASE 
           WHEN salary >= 80000.00 THEN 'Tier 1 - Executive'
           WHEN salary BETWEEN 50000.00 AND 79999.99 THEN 'Tier 2 - Mid-Level'
           ELSE 'Tier 3 - Associate'
       END AS salary_bracket
FROM employees;
```
* **How it works (English)**: Scans salary values. If an employee earns 80000 or more, it outputs 'Tier 1'. If they earn between 50000 and 80000, it outputs 'Tier 2'. Otherwise, it outputs 'Tier 3'.
* **हे कसे काम करते (मराठी)**: हे कमांड प्रत्येक कर्मचाऱ्याचा पगार तपासते. पगार ८०००० पेक्षा जास्त असल्यास 'Tier 1', ५०००० ते ८०००० च्या दरम्यान असल्यास 'Tier 2' आणि कमी असल्यास 'Tier 3' असा शेरा बाजूच्या नवीन रकान्यात जोडते.

---

## 2. Pivot & Unpivot (डेटा फिरवणे - आडवी मांडणी)

* **Pivot**: Converts row values into columns (rotates table representation). (उभ्या ओळींचे कॉलम्समध्ये रूपांतर करून आडवा रिपोर्ट बनवण्यासाठी).
* **Unpivot**: Converts columns back into rows. (कॉलम्सचे पुन्हा ओळींमध्ये रूपांतर करण्यासाठी).

```sql
-- Pivot representation using conditional aggregation (standard SQL method)
SELECT 
    department,
    SUM(CASE WHEN country = 'US' THEN salary ELSE 0 END) AS us_payroll,
    SUM(CASE WHEN country = 'IN' THEN salary ELSE 0 END) AS in_payroll,
    SUM(CASE WHEN country = 'UK' THEN salary ELSE 0 END) AS uk_payroll
FROM employees
GROUP BY department;
```
* **How it works (English)**: Rotates country-level payroll rows into three columns (`us_payroll`, `in_payroll`, `uk_payroll`), summarized per department.
* **हे कसे काम करते (मराठी)**: हे कमांड देशानुसार असलेला उभ्या ओळींमधील पगाराचा डेटा फिरवून त्याचे आडव्या रकान्यांमध्ये (`us_payroll`, `in_payroll`) रूपांतर करते.

---

## 3. String & Date Functions (मजकूर आणि तारीख फंक्शन्स)

Used to clean raw text and analyze time series. (अपूर्ण किंवा अस्वच्छ डेटा स्वच्छ करण्यासाठी आणि तारखांवर प्रक्रिया करण्यासाठी).

```sql
-- String Cleaning
SELECT 
    TRIM(LOWER(name)) AS cleaned_name,                  -- Remove spaces and convert to lowercase
    SUBSTRING(phone_number FROM 1 FOR 3) AS area_code    -- Extract first 3 characters
FROM employees;

-- Date Extraction
SELECT 
    join_date,
    EXTRACT(YEAR FROM join_date) AS join_year,           -- Extract year
    EXTRACT(MONTH FROM join_date) AS join_month,         -- Extract month
    AGE(CURRENT_DATE, join_date) AS company_tenure       -- Calculate difference
FROM employees;
```

---

## 4. Cohort & Time Series Analysis (कोहॉर्ट आणि टाईम सिरीज विश्लेषण)

### A. Month-over-Month (MoM) Growth Calculation (महिन्याभरातील वाढ मोजणे)
Calculates growth rates sequentially using LAG window functions. (मागील महिन्याची तुलना करून कंपनीच्या व्यवहारातील वाढ मोजणे).

```sql
WITH MonthlyRevenue AS (
    SELECT 
        EXTRACT(MONTH FROM sale_date) AS sale_month,
        SUM(amount) AS revenue
    FROM sales
    GROUP BY EXTRACT(MONTH FROM sale_date)
)
SELECT 
    sale_month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY sale_month) AS prev_month_revenue,
    ((revenue - LAG(revenue, 1) OVER (ORDER BY sale_month)) / 
     LAG(revenue, 1) OVER (ORDER BY sale_month)) * 100 AS mom_growth_percent
FROM MonthlyRevenue;
```
* **How it works (English)**: Calculates total monthly revenue, fetches the previous month's revenue using `LAG()`, and calculates the percentage growth MoM.
* **हे कसे काम करते (मराठी)**: हे कमांड महिन्याची एकूण कमाई मोजते, `LAG()` द्वारे मागील महिन्याची कमाई शेजारी आणते आणि या दोन्हीची तुलना करून महिन्याभरात किती टक्के वाढ झाली हे मोजते.

### B. Cohort Analysis (युझर गट वर्तन विश्लेषण)
Groups users by their sign-up month and tracks repeat purchases over time. (वापरकर्त्यांच्या पहिल्या खरेदी महिन्यानुसार गट पाडून त्यांच्या पुढील खरेदीचा अभ्यास करणे).

```sql
-- Find cohort starting month per user
WITH UserCohort AS (
    SELECT user_id, MIN(DATE_TRUNC('month', order_date)) AS cohort_month
    FROM orders
    GROUP BY user_id
)
SELECT 
    u.cohort_month,
    DATE_TRUNC('month', o.order_date) AS order_month,
    COUNT(DISTINCT o.user_id) AS active_users
FROM orders o
JOIN UserCohort u ON o.user_id = u.user_id
GROUP BY u.cohort_month, DATE_TRUNC('month', o.order_date);
```
