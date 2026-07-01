# 📚 Level 01: SQL Fundamentals (SQL मूलभूत गोष्टी)

This module covers the core foundation of Relational Databases and SQL commands. (या मॉड्युलमध्ये आपण SQL आणि डेटाबेसच्या मूलभूत गोष्टी शिकणार आहोत).

---

## 1. What is SQL and DBMS? (SQL आणि DBMS म्हणजे काय?)

### English:
* **DBMS (Database Management System)**: A software system used to store, manage, and retrieve data efficiently (e.g., MySQL, PostgreSQL, Oracle, SQLite).
* **SQL (Structured Query Language)**: The standard programming language used to communicate with and manipulate relational databases.

### Marathi (मराठी):
* **DBMS (डेटाबेस मॅनेजमेंट सिस्टम)**: हा एक सॉफ्टवेअर प्रोग्राम आहे ज्याचा वापर डेटा सुरक्षितपणे साठवण्यासाठी (Store), व्यवस्थापित करण्यासाठी (Manage) आणि मिळवण्यासाठी (Retrieve) केला जातो. (उदा. MySQL, Oracle, SQLite).
* **SQL (स्ट्रक्चर्ड क्वेरी लँग्वेज)**: डेटाबेससोबत संवाद साधण्यासाठी आणि डेटावर काम करण्यासाठी वापरली जाणारी ही एक मानक (Standard) भाषा आहे.

---

## 2. Relational Database Concepts (डेटाबेस संकल्पना)

* **Database (डेटाबेस)**: A collection of organized data tables. (डेटाचा संघटित संग्रह).
* **Table (टेबल)**: Data stored in structured rows and columns. (रो आणि कॉलमच्या स्वरूपातील डेटा).
* **Row/Record (रो/रेकॉर्ड)**: A single horizontal entry representing one record. (एका विशिष्ट घटकाची संपूर्ण माहिती देणारी आडवी ओळ).
* **Column/Field (कॉलम/फील्ड)**: A vertical entity representing a specific attribute. (विशिष्ट प्रकारचा डेटा दर्शवणारी उभी ओळ, जसे की 'नाव' किंवा 'वय').

---

## 3. Data Types (डेटा प्रकार)

Common SQL data types used to define columns: (कॉलम व्याख्या करण्यासाठी वापरले जाणारे डेटा प्रकार):
* **`INT` / `INTEGER`**: Whole numbers. (पूर्ण संख्या, उदा. 1, 2, 100).
* **`VARCHAR(size)`**: Variable-length strings. (अक्षरे आणि शब्द, उदा. नाव).
* **`DECIMAL(p,s)`**: Floating point numbers. (दशांश संख्या, उदा. पगार `12500.50`).
* **`DATE`**: Calendar dates (`YYYY-MM-DD`). (दिनांक).

---

## 4. SQL DDL & DML Commands (SQL कमांड्स)

### A. CREATE DATABASE & TABLE (डेटाबेस आणि टेबल तयार करणे)
Used to define schemas. (नवीन स्कीमा तयार करण्यासाठी वापरली जाते).

```sql
-- Create Database
CREATE DATABASE office_db;

-- Create Table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    salary DECIMAL(10,2),
    join_date DATE
);
```
* **How it works (English)**: Creates a table named `employees` with 5 columns, enforcing `emp_id` as the unique identifier (Primary Key).
* **हे कसे काम करते (मराठी)**: हे `employees` नावाचे एक नवीन टेबल तयार करते ज्यामध्ये ५ कॉलम्स आहेत, आणि `emp_id` ला युनिक आयडेंटिफायर (Primary Key) बनवते जेणेकरून दोन कर्मचाऱ्यांचा आयडी समान असणार नाही.

---

### B. INSERT INTO (डेटा भरणे)
Adds new rows to a table. (टेबलमध्ये नवीन डेटा रेकॉर्ड्स जोडण्यासाठी).

```sql
INSERT INTO employees (emp_id, name, age, salary, join_date)
VALUES (101, 'Amit Sharma', 28, 55000.00, '2026-01-15');
```
* **How it works (English)**: Inserts a new record for Amit Sharma into the specified columns of the `employees` table.
* **हे कसे काम करते (मराठी)**: हे कमांड 'employees' टेबलमधील ठरवलेल्या कॉलम्समध्ये 'Amit Sharma' नावाच्या कर्मचाऱ्याची माहिती नवीन ओळ (Row) म्हणून जोडते.

---

### C. SELECT & DISTINCT (डेटा पाहणे आणि युनिक व्हॅल्यूज निवडणे)
Queries data from the table. (टेबलमधील डेटा क्वेरी करण्यासाठी).

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns and eliminate duplicates
SELECT DISTINCT age FROM employees;
```
* **How it works (English)**: The first query retrieves all data. The second query displays only unique ages from the table, filtering out duplicate age entries.
* **हे कसे काम करते (मराठी)**: पहिली क्वेरी टेबलमधील सर्व कॉलम्स आणि सर्व डेटा दाखवते. दुसरी क्वेरी वय (age) कॉलममधील केवळ युनिक वये दाखवते, म्हणजेच पुनरावृत्ती झालेली वये वगळते (Duplicates काढून टाकते).

---

### D. WHERE Clause (फिल्टर लावणे)
Filters rows based on conditions. (विशिष्ट अटींनुसार डेटा फिल्टर करण्यासाठी).

```sql
SELECT * FROM employees 
WHERE salary > 50000.00;
```
* **How it works (English)**: Filters and displays only those employees whose salary column value exceeds 50000.
* **हे कसे काम करते (मराठी)**: हे कमांड केवळ अशा कर्मचाऱ्यांची यादी दाखवते ज्यांचा पगार ५०००० पेक्षा जास्त आहे.

---

### E. ORDER BY & LIMIT (क्रम लावणे आणि निकाल मर्यादित करणे)
Sorts results and caps outputs. (निकालांचा क्रम लावणे आणि ओळी मर्यादित करणे).

```sql
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 3;
```
* **How it works (English)**: Sorts all employees by salary in descending order (highest first) and limits the output to only the top 3 rows.
* **हे कसे काम करते (मराठी)**: हे कमांड सर्व कर्मचाऱ्यांचे पगाराच्या उतरत्या क्रमाने (मोठ्याकडून लहानाकडे) वर्गीकरण करते आणि फक्त पहिल्या ३ कर्मचाऱ्यांची माहिती दाखवते.

---

### F. UPDATE & DELETE (डेटा सुधारणे आणि डिलीट करणे)
Modifies or removes existing data. (विद्यमान डेटा बदलणे किंवा काढून टाकणे).

```sql
-- Update salary
UPDATE employees
SET salary = 60000.00
WHERE emp_id = 101;

-- Delete record
DELETE FROM employees
WHERE emp_id = 101;
```
* **How it works (English)**: `UPDATE` modifies the salary of employee 101. `DELETE` removes employee 101 from the database. **Warning**: Always use `WHERE` or you will update/delete all rows!
* **हे कसे काम करते (मराठी)**: `UPDATE` कमांड १०१ आयडी असलेल्या कर्मचाऱ्याचा पगार ६०००० करतो. `DELETE` कमांड १०१ आयडी असलेल्या कर्मचाऱ्याचे रेकॉर्ड डिलीट करते. **महत्त्वाची सूचना**: जर तुम्ही `WHERE` क्लॉज वापरला नाही, तर सर्व कर्मचाऱ्यांचा डेटा बदलला किंवा डिलीट होईल!

---

### G. ALTER & DROP (टेबल रचना बदलणे आणि टेबल नष्ट करणे)
Changes schema structure. (टेबलचे स्ट्रक्चर बदलण्यासाठी किंवा टेबल हटवण्यासाठी).

```sql
-- Add a new column
ALTER TABLE employees ADD email VARCHAR(100);

-- Drop table completely
DROP TABLE employees;
```
* **How it works (English)**: `ALTER` appends a new column `email` to the existing table. `DROP` deletes the table and all its stored data permanently.
* **हे कसे काम करते (मराठी)**: `ALTER` कमांड टेबलमध्ये 'email' नावाचा एक नवीन कॉलम जोडते. `DROP` कमांड 'employees' टेबल आणि त्यातील सर्व डेटा कायमचा नष्ट करते.
