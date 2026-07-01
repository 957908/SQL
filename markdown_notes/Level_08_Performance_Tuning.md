# 📚 Level 08: Performance Tuning (परफॉर्मन्स ट्यूनिंग आणि ऑप्टिमायझेशन)

This module covers query execution speedups, database indexes, analyzing execution plans, and table partitioning. (या मॉड्युलमध्ये आपण डेटाबेसवरील क्वेरीजचा वेग वाढवणे, इंडेक्स वापरणे, एक्झिक्युशन प्लॅन वाचणे आणि मोठे टेबल्स विभागणे शिकणार आहोत).

---

## 1. Database Indexes (डेटाबेस इंडेक्स)

Indexes are special lookup tables that the database search engine uses to speed up data retrieval. Think of it as the index at the back of a book. (जसे पुस्तकाच्या शेवटी अनुक्रमणिका (Index) असते ज्यामुळे विशिष्ट पानावर जाणे सोपे होते, तसेच डेटाबेसमधील इंडेक्स काम करते).

### A. Clustered Index (क्लस्टर्ड इंडेक्स)
* **English**: Sorts and stores the physical data rows in the table based on their key values. There can only be **one** clustered index per table (typically the Primary Key automatically creates this).
* **मराठी**: हे टेबलमधील डेटा प्रत्यक्षपणे (Physically) क्रमाने साठवते (उदा. रोल नंबर प्रमाणे मांडणी). एका टेबलमध्ये फक्त **एकच** क्लस्टर्ड इंडेक्स असू शकतो (प्रायमरी की तयार करताच हा आपोआप बनतो).

### B. Non-Clustered Index (नॉन-क्लस्टर्ड इंडेक्स)
* **English**: Creates a separate structure containing pointers to the physical rows. You can have **multiple** non-clustered indexes per table (like indices on columns frequently queried in `WHERE` filters).
* **मराठी**: हे डेटा प्रत्यक्ष सॉर्ट न करता, डेटाच्या पत्त्यांची (Pointers) एक वेगळी स्वतंत्र यादी तयार करते. एका टेबलमध्ये आपण **अनेक** नॉन-क्लस्टर्ड इंडेक्स बनवू शकतो (उदा. नावावर किंवा मोबाईल नंबरवर आधारित शोधणे).

```sql
-- Create Non-Clustered Index on email column
CREATE INDEX idx_emp_email ON employees(email);

-- Create Composite Index (Multiple columns combined)
CREATE INDEX idx_emp_dept_salary ON employees(dept_id, salary);
```

---

## 2. Analyzing Execution Plans (एक्झिक्युशन प्लॅन विश्लेषण)

Before optimizing a query, you must ask the database engine how it plans to execute it. (क्वेरी धावण्यापूर्वी डेटाबेस कोणती पायरी वापरणार आहे हे तपासणे).

```sql
-- Prefix query with EXPLAIN (or EXPLAIN ANALYZE for actual run timings)
EXPLAIN SELECT * FROM employees WHERE email = 'amit@company.com';
```

### Key Terms in Execution Plans (महत्त्वाचे संज्ञा):
1. **Seq Scan (Sequential/Table Scan)**: 
   * Reads every single row in the table from disk. Extremely slow on large tables.
   * **मराठी**: टेबलमधील प्रत्येक ओळ क्रमाने वाचणे. मोठा डेटा असल्यास हे खूप संथ काम करते (याला 'Full Table Scan' देखील म्हणतात).
2. **Index Scan (इंडेक्स स्कॅन)**:
   * Uses the index tree to jump directly to matching rows. Fast and efficient.
   * **मराठी**: इंडेक्सचा वापर करून थेट हव्या असलेल्या रेकॉर्डवर उडी मारणे. हे अत्यंत कार्यक्षम आणि वेगवान आहे.

---

## 3. Table Partitioning (टेबल पार्टिशनिंग)

Splitting a massive table into smaller physical pieces (partitions) while maintaining a single logical table interface. (मोठ्या आकाराच्या टेबल्सचे लहान भौतिक भागांमध्ये वर्गीकरण करणे जेणेकरून शोधणे सोपे होईल).

```sql
-- Create Partitioned Table by Range
CREATE TABLE sales_data (
    sale_id INT,
    sale_date DATE,
    amount DECIMAL
) PARTITION BY RANGE (sale_date);

-- Define individual partition tables
CREATE TABLE sales_2025 PARTITION OF sales_data
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE sales_2026 PARTITION OF sales_data
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
```
* **How it works (English)**: A query seeking data for '2025-06-15' will bypass the 2026 partition entirely, reducing read IO operations.
* **हे कसे काम करते (मराठी)**: जेव्हा आपण २०२५ मधील डेटा शोधतो, तेव्हा डेटाबेस २०२६ चे पार्टिशन वाचत नाही, फक्त २०२५ च्या पार्टिशनमधून डेटा आणतो, ज्यामुळे वेळेची मोठी बचत होते.

---

## 4. Query Optimization Techniques (क्वेरी सुधारण्याच्या पद्धती)

* **Avoid `SELECT *`**: Specify only required columns to reduce network data transfer. (नेहमी फक्त हवे तेच कॉलम्स निवडा, `SELECT *` टाळा).
* **Avoid Leading Wildcards (`%pattern`)**: Queries like `LIKE '%amit'` cannot use indexes. Use trailing wildcards like `LIKE 'amit%'` instead. (LIKE शोधताना सुरुवातीला '%' वापरणे टाळा, नाहीतर इंडेक्सचा वापर होत नाही).
* **Use EXISTS instead of IN**: For large subqueries, `EXISTS` stops scanning as soon as it finds a match, whereas `IN` runs the entire subquery first. (मोठ्या सबक्वेरीच्या बाबतीत IN ऐवजी EXISTS वापरा).
