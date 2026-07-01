# 📚 Level 02: Intermediate SQL (मध्यम पातळीवरील SQL)

This module covers complex filtering, aggregation functions, grouping records, and handling empty values. (या मॉड्युलमध्ये आपण डेटावर फिल्टर लावणे, बेरीज-सरासरी करणे, ग्रुप तयार करणे आणि रिकाम्या व्हॅल्यूज हाताळणे शिकणार आहोत).

---

## 1. Comparison & Logical Operators (तुलना आणि तार्किक ऑपरेटर)

Used to filter query results using multiple parameters. (अनेक अटी एकत्र करून डेटा अधिक अचूकपणे फिल्टर करण्यासाठी).

```sql
SELECT * FROM employees
WHERE salary >= 40000.00 
  AND age < 30 
  AND department != 'HR';
```
* **How it works (English)**: Retrieves employees earning 40000 or more, younger than 30, and who do not belong to the HR department.
* **हे कसे काम करते (मराठी)**: हे कमांड अशा कर्मचाऱ्यांची माहिती शोधते ज्यांचे वय ३० पेक्षा कमी आहे, पगार ४०००० किंवा त्यापेक्षा जास्त आहे, आणि जे HR डिपार्टमेंटमध्ये काम करत नाहीत.

---

## 2. Advanced Filtering: LIKE, BETWEEN, IN

### A. Pattern Matching with `LIKE` (पॅटर्न मॅचिंग)
Allows searching for patterns using wildcards:
* `%`: Represents zero or more characters. (शून्य किंवा अधिक अक्षरे).
* `_`: Represents a single character. (फक्त एक अक्षर).

```sql
-- Name starting with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

-- Name containing 'Sh'
SELECT * FROM employees WHERE name LIKE '%Sh%';
```
* **How it works (English)**: The first query finds employees whose name begins with 'A' (e.g., Amit). The second finds names containing 'Sh' (e.g., Sharma).
* **हे कसे काम करते (मराठी)**: पहिली क्वेरी अशा कर्मचाऱ्यांना शोधते ज्यांचे नाव 'A' अक्षराने सुरू होते. दुसरी क्वेरी अशा कर्मचाऱ्यांना शोधते ज्यांच्या नावामध्ये 'Sh' हे शब्द आहेत.

---

### B. Range Queries with `BETWEEN` & Multiple Values with `IN` (रेंज आणि मल्टिपल व्हॅल्यूज)
```sql
-- Salary range between 40000 and 70000
SELECT * FROM employees WHERE salary BETWEEN 40000.00 AND 70000.00;

-- Filter by specific departments
SELECT * FROM employees WHERE department IN ('Sales', 'IT', 'Finance');
```
* **How it works (English)**: `BETWEEN` checks a inclusive range. `IN` checks if the column matches any value in a list (saves writing multiple `OR` statements).
* **हे कसे काम करते (मराठी)**: `BETWEEN` कमांड ४०००० ते ७०००० या मर्यादेतील पगार असणारे कर्मचारी शोधते. `IN` कमांड कंसात दिलेल्या डिपार्टमेंट्सपैकी (Sales, IT, Finance) कोणत्याही एका डिपार्टमेंटमध्ये काम करणाऱ्या कर्मचाऱ्यांना शोधते (यामुळे वारंवार `OR` लिहिण्याची गरज पडत नाही).

---

## 3. Handling NULL Values (IS NULL, COALESCE)

`NULL` represents missing or unknown data. Normal operators like `=` do not work with NULL. (डेटाबेसमध्ये NULL म्हणजे माहिती उपलब्ध नसणे. NULL शोधण्यासाठी नेहमी `IS NULL` वापरावे).

```sql
-- Find employees without a phone number
SELECT * FROM employees WHERE phone_number IS NULL;

-- Replace NULL values with a default value
SELECT name, COALESCE(phone_number, 'No Phone') AS contact_info 
FROM employees;
```
* **How it works (English)**: `IS NULL` returns rows where the column is empty. `COALESCE(val1, val2)` checks if `val1` is NULL; if yes, it returns `val2`.
* **हे कसे काम करते (मराठी)**: `IS NULL` कमांड असे कर्मचारी शोधते ज्यांचे फोन नंबर रेकॉर्डमध्ये रिकामे आहेत. `COALESCE` कमांड जर फोन नंबर रिकामी (NULL) असेल तर त्या जागी 'No Phone' असा डीफॉल्ट मजकूर दाखवते.

---

## 4. Aggregate Functions & Aliases (एकत्रित कार्ये आणि टोपणनावे)

Performs mathematical calculations on a column set and uses `AS` to rename the output column. (एका कॉलममधील सर्व डेटावर गणिती प्रक्रिया करण्यासाठी).

```sql
SELECT 
    COUNT(emp_id) AS total_employees,
    SUM(salary) AS total_payroll,
    AVG(salary) AS average_salary,
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary
FROM employees;
```
* **How it works (English)**: Calculates count, total sum, average, maximum, and minimum values of the employees table.
* **हे कसे काम करते (मराठी)**: हे कमांड एकूण कर्मचारी संख्या (COUNT), एकूण पगाराची बेरीज (SUM), सरासरी पगार (AVG), सर्वोच्च पगार (MAX) आणि सर्वात कमी पगार (MIN) एकाच वेळी मोजून दाखवते.

---

## 5. GROUP BY & HAVING (ग्रुप तयार करणे आणि ग्रुपवर फिल्टर लावणे)

* `GROUP BY`: Groups rows that have the same values into summary rows. (समान मूल्य असलेल्या ओळींचे गट तयार करण्यासाठी).
* `HAVING`: Filters groups based on aggregate conditions (like `WHERE`, but runs *after* groups are created). (ग्रुप तयार झाल्यावर त्यांच्यावर अट लावण्यासाठी).

```sql
SELECT department, COUNT(emp_id) AS emp_count, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000.00;
```
* **How it works (English)**: Groups employees by department, counts them, and calculates average salary per department. The `HAVING` clause filters out departments whose average salary is 50000 or less.
* **हे कसे काम करते (मराठी)**: हे कमांड कर्मचाऱ्यांचे त्यांच्या डिपार्टमेंटनुसार ग्रुप्स पाडते, प्रत्येक ग्रुपमधील कर्मचारी संख्या आणि सरासरी पगार मोजते. शेवटी `HAVING` क्लॉजमुळे फक्त तेच डिपार्टमेंट्स समोर येतात ज्यांचा सरासरी पगार ५०००० पेक्षा जास्त आहे.
