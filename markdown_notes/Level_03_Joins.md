# 📚 Level 03: Joins (डेटाबेस जॉईन्स)

This module covers combining rows from two or more tables based on a related column between them. (या मॉड्युलमध्ये आपण दोन किंवा अधिक टेबल्समधील संबंधित कॉलमच्या आधारे त्यांचा डेटा एकत्र कसा करायचा हे शिकणार आहोत).

---

## 🗺️ Visualizing Join Types

```text
  [Table A] ──( Join Key )── [Table B]
     │                          │
     ├── INNER JOIN  ──────────> Matches in BOTH A and B
     ├── LEFT JOIN   ──────────> All A + Matching B (NULL if no match)
     ├── RIGHT JOIN  ──────────> All B + Matching A (NULL if no match)
     └── FULL JOIN   ──────────> All records from A and B (NULL if unmatched)
```

---

## 1. Inner Join (आंतरिक जॉईन)

Returns records that have matching values in both tables. (दोन्ही टेबल्समध्ये मॅच होणारा डेटा मिळवण्यासाठी).

```sql
SELECT e.emp_id, e.name, d.dept_name
FROM employees e
INNER JOIN departments d 
ON e.dept_id = d.dept_id;
```
* **How it works (English)**: Combines the `employees` and `departments` tables. It returns only the employees who have a valid `dept_id` that exists in the `departments` table.
* **हे कसे काम करते (मराठी)**: हे कमांड `employees` आणि `departments` टेबल्स एकत्र करते. जे कर्मचारी एखाद्या डिपार्टमेंटमध्ये आहेत आणि त्या डिपार्टमेंटची माहिती दुसऱ्या टेबलमध्ये उपलब्ध आहे, फक्त त्यांचीच नावे आणि डिपार्टमेंट्स हे दाखवते.

---

## 2. Left Join / Left Outer Join (डावे जॉईन)

Returns all records from the left table, and matching records from the right table. If there is no match, the result is `NULL` on the right side. (डाव्या टेबलमधील सर्व डेटा आणि उजव्या टेबलमधील फक्त मॅच होणारा डेटा मिळवण्यासाठी).

```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d 
ON e.dept_id = d.dept_id;
```
* **How it works (English)**: Returns all employees from the left table (`employees`). If an employee does not belong to any department, the `dept_name` column will show `NULL`.
* **हे कसे काम करते (मराठी)**: डाव्या टेबलमधील (`employees`) सर्व कर्मचाऱ्यांची नावे दाखवली जातील. जर एखाद्या कर्मचाऱ्याला अद्याप कोणतेही डिपार्टमेंट दिलेले नसेल, तर त्याच्या नावापुढील डिपार्टमेंटच्या रकान्यात 'NULL' (रिकामा) दिसेल.

---

## 3. Right Join / Right Outer Join (उजवे जॉईन)

Returns all records from the right table, and matching records from the left table. If there is no match, the result is `NULL` on the left side. (उजव्या टेबलमधील सर्व डेटा आणि डाव्या टेबलमधील फक्त मॅच होणारा डेटा मिळवण्यासाठी).

```sql
SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d 
ON e.dept_id = d.dept_id;
```
* **How it works (English)**: Returns all departments from the right table (`departments`). If a department has no employees assigned to it, the `name` column will show `NULL`.
* **हे कसे काम करते (मराठी)**: उजव्या टेबलमधील (`departments`) सर्व डिपार्टमेंट्सची नावे दाखवली जातील. जर एखाद्या डिपार्टमेंटमध्ये एकही कर्मचारी काम करत नसेल, तर त्याच्यापुढील कर्मचाऱ्याच्या नावात 'NULL' दिसेल.

---

## 4. Full Outer Join (पूर्ण जॉईन)

Returns all records when there is a match in either left or right table. (दोन्ही टेबल्समधील सर्वच्या सर्व डेटा एकत्र दाखवण्यासाठी, मॅच न झाल्यास रिकाम्या जागांमध्ये NULL येईल).

```sql
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d 
ON e.dept_id = d.dept_id;
```
* **How it works (English)**: Combines all records from both tables. It shows all employees and all departments. Unmatched values display as `NULL`.
* **हे कसे काम करते (मराठी)**: हे कमांड दोन्ही टेबल्समधील सर्व रेकॉर्ड्स एकत्र करते. सर्व कर्मचारी आणि सर्व डिपार्टमेंट्स एकाच वेळी समोर येतात. जिथे डेटा मॅच होत नाही, तिथे 'NULL' दाखवले जाते.

---

## 5. Self Join (स्वतःशीच जॉईन)

A table is joined with itself. Useful for hierarchical relationships (e.g., matching employees to their managers). (एकाच टेबलचे स्वतःशीच जॉईन करणे, जसे की कर्मचाऱ्याला त्याच्या मॅनेजरशी जोडणे).

```sql
SELECT e.name AS employee_name, m.name AS manager_name
FROM employees e
LEFT JOIN employees m 
ON e.manager_id = m.emp_id;
```
* **How it works (English)**: Treats the `employees` table as two copies: `e` (for employees) and `m` (for managers). It joins them by matching the manager's ID of the employee to the employee ID of the manager.
* **हे कसे काम करते (मराठी)**: हे कमांड एकाच टेबलला 'e' (कर्मचारी) आणि 'm' (मॅनेजर) अशी दोन नावे देऊन स्वतःशीच जोडते. ज्या कर्मचाऱ्याच्या मॅनेजरचा आयडी (`manager_id`) हा ज्या मॅनेजरच्या स्वतःच्या आयडीशी (`emp_id`) मॅच होईल, ती जोडणी करून दाखवली जाते.

---

## 6. Cross Join (क्रॉस जॉईन)

Returns the Cartesian product of the two tables (combines every row of the first table with every row of the second table). (कार्टेशियन गुणाकार - पहिल्या टेबलमधील प्रत्येक ओळ दुसऱ्या टेबलमधील प्रत्येक ओळीशी जोडण्यासाठी).

```sql
SELECT e.name, p.project_name
FROM employees e
CROSS JOIN projects p;
```
* **How it works (English)**: If there are 10 employees and 3 projects, it will return $10 \times 3 = 30$ rows, pairing every employee with every project.
* **हे कसे काम करते (मराठी)**: जर तुमच्याकडे १० कर्मचारी आणि ३ प्रोजेक्ट्स असतील, तर हे कमांड एकूण ३० ($१० \times ३$) ओळींचे रिझल्ट दाखवेल, ज्यामध्ये प्रत्येक कर्मचाऱ्याची जोडणी प्रत्येक प्रोजेक्टशी करून दाखवली जाते.
