# 📚 Level 05: Window Functions (विंडो फंक्शन्स)

Window functions perform calculations across a set of table rows that are related to the current row, without collapsing the output into a single row like aggregation queries. (विंडो फंक्शन्स ग्रुप बाय क्लॉजसारखे ओळी एकत्र (Collapse) न करता, प्रत्येक ओळीसाठी तिची स्वतंत्र माहिती टिकवून ठेवून तिच्याशी संबंधित इतर ओळींवर आधारित गणना करतात).

---

## 1. Ranking Functions: ROW_NUMBER, RANK, DENSE_RANK

Used to generate ranks for rows based on sorting criteria. (विशिष्ट क्रमानुसार ओळींना रँक किंवा क्रमांक देण्यासाठी).

```sql
SELECT 
    name, 
    department, 
    salary,
    -- Unique row index
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    -- Rank with gaps (1, 2, 2, 4)
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
    -- Rank without gaps (1, 2, 2, 3)
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rnk
FROM employees;
```

### English Explanation:
* **`ROW_NUMBER()`**: Assigns a sequential integer starting at 1 for each row within a partition, regardless of duplicate values.
* **`RANK()`**: Assigns ranks based on values. If two employees have the same salary, they get the same rank, and the next rank is skipped (e.g., 1, 2, 2, 4).
* **`DENSE_RANK()`**: Similar to `RANK()`, but does not skip any ranks (e.g., 1, 2, 2, 3).

### Marathi Explanation (मराठी):
* **`ROW_NUMBER()`**: हे कॉलममधील डेटा सारखा असला तरीही प्रत्येक ओळीला क्रमाने १, २, ३ असा स्वतंत्र नंबर देते.
* **`RANK()`**: जर दोन कर्मचाऱ्यांचा पगार सारखा असेल, तर त्यांना समान रँक मिळते, पण पुढील रँक वगळली जाते (उदा. १, २, २, ४ — तिसरी रँक गायब होते).
* **`DENSE_RANK()`**: हे देखील 'RANK' सारखेच काम करते, पण यामध्ये कोणतीही रँक वगळली जात नाही (उदा. १, २, २, ३).

---

## 2. NTILE (विभाजन करणे)

Divides ordered partition rows into a specified number of ranked groups. (डेटाचे समान गटांमध्ये विभाजन करण्यासाठी).

```sql
-- Divide employees into 4 salary quartiles
SELECT name, salary,
       NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
```
* **How it works (English)**: Divides the employees into 4 equal groups. The top 25% earners get `1`, the next 25% get `2`, and so on.
* **हे कसे काम करते (मराठी)**: हे कमांड सर्व कर्मचाऱ्यांचे त्यांच्या पगाराच्या आधारे ४ समान गटांमध्ये वर्गीकरण करते. सर्वात जास्त पगार घेणाऱ्या पहिल्या २५% लोकांना '१' ग्रुप मिळतो, त्यापुढील लोकांना '२' आणि असे चालू राहते.

---

## 3. Lead & Lag (पुढील आणि मागील डेटा मिळवणे)

Accesses data from subsequent or preceding rows without joining tables. (पुढील किंवा मागील ओळीतील डेटा थेट मिळवण्यासाठी).

```sql
SELECT name, salary,
       -- Value from previous row
       LAG(salary, 1, 0) OVER (ORDER BY salary DESC) AS prev_higher_salary,
       -- Value from next row
       LEAD(salary, 1, 0) OVER (ORDER BY salary DESC) AS next_lower_salary
FROM employees;
```
* **How it works (English)**: `LAG` fetches the salary of the person immediately earning more. `LEAD` fetches the salary of the person immediately earning less. The third parameter (`0`) replaces any NULLs.
* **हे कसे काम करते (मराठी)**: `LAG` कमांड चालू ओळीच्या आधीच्या (वरच्या) ओळीतील पगार दाखवते. `LEAD` कमांड चालू ओळीच्या नंतरच्या (खालच्या) ओळीतील पगार दाखवते. तिसरा रकाना (`0`) जर मागील/पुढील ओळ अस्तित्वात नसेल तर शून्य दाखवण्यासाठी वापरला आहे.

---

## 4. First Value & Last Value (पहिले आणि शेवटचे मूल्य)

Retrieves the first or last value in an ordered window partition. (विंडोमधील सर्वात पहिले किंवा सर्वात शेवटचे मूल्य मिळवण्यासाठी).

```sql
SELECT name, department, salary,
       FIRST_VALUE(name) OVER (
           PARTITION BY department 
           ORDER BY salary DESC
       ) AS highest_paid_in_dept
FROM employees;
```
* **How it works (English)**: Identifies the name of the highest-paid employee in each department and prints it on every row belonging to that department.
* **हे कसे काम करते (मराठी)**: हे कमांड प्रत्येक डिपार्टमेंटमधील सर्वात जास्त पगार घेणाऱ्या कर्मचाऱ्याचे नाव शोधते आणि त्या डिपार्टमेंटमधील प्रत्येक कर्मचाऱ्याच्या ओळीसमोर ते नाव दर्शवते.

---

## 5. Window Aggregates (विंडो एकत्रित बेरीज/सरासरी)

Performs cumulative aggregation calculations on partitioned ranges. (रनिंग टोटल किंवा संचयी सरासरी काढण्यासाठी).

```sql
SELECT name, department, salary,
       -- Cumulative running total within the department
       SUM(salary) OVER (
           PARTITION BY department 
           ORDER BY salary DESC 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM employees;
```
* **How it works (English)**: Calculates the running total of salaries within each department, adding the current row's salary to the sum of all preceding salaries in that department partition.
* **हे कसे काम करते (मराठी)**: हे कमांड प्रत्येक डिपार्टमेंटमधील कर्मचाऱ्यांच्या पगाराची संचयी बेरीज (Running Total) करते. प्रत्येक नवीन ओळीवर मागील सर्व पगारांची बेरीज चालू ओळीतील पगारामध्ये जोडली जाते.
