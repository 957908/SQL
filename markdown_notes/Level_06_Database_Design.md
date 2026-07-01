# 📚 Level 06: Database Design (डेटाबेस डिझाईन आणि रचना)

This module covers database schema structure, keys, constraints, normalization, and data warehouse design schemas (Star and Snowflake). (या मॉड्युलमध्ये आपण डेटाबेस स्कीमा रचना, कीज्, नॉर्मलायझेशन आणि डेटा वेअरहाऊस डिझाईन मॉडेल्स शिकणार आहोत).

---

## 1. Database Keys & Constraints (डेटाबेस कीज् आणि नियंत्रणे)

* **Primary Key (प्राथमिक की)**: A column that uniquely identifies each row in a table. It cannot contain NULL values. (प्रत्येक ओळ युनिकली ओळखणारा कॉलम; यामध्ये रिकामी जागा (NULL) चालत नाही).
* **Foreign Key (परदेशी की)**: A column that establishes a link between tables by referencing the primary key of another table. (दोन टेबल्समध्ये संबंध जोडण्यासाठी दुसऱ्या टेबलच्या प्रायमरी कीचा संदर्भ देणारा कॉलम).
* **Unique Key (युनिक की)**: Ensures all values in a column are distinct, but allows a single NULL value. (सर्व डेटा युनिक असावा पण एका NULL व्हॅल्यूला परवानगी देते).
* **Candidate Key (उमेदवार की)**: Any minimal set of columns that can act as a primary key. (प्रायमरी की बनण्यास पात्र असणारे सर्व कॉलम्स).
* **Composite Key (संयुक्त की)**: A primary key consisting of two or more columns combined. (दोन किंवा अधिक कॉलम्स एकत्र करून बनवलेली प्रायमरी की).

```sql
CREATE TABLE project_assignments (
    emp_id INT,
    project_id INT,
    assigned_date DATE,
    -- Composite Primary Key
    PRIMARY KEY (emp_id, project_id),
    -- Foreign Key references
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);
```

---

## 2. Database Normalization (नॉर्मलायझेशन)

Normalization is the process of organizing database tables to reduce data redundancy (duplicate data) and improve data integrity. (डेटाबेसमध्ये वारंवार होणारी डेटाची पुनरावृत्ती कमी करण्यासाठी आणि डेटा सुरक्षित ठेवण्यासाठी टेबल्सचे वर्गीकरण करण्याची प्रक्रिया).

```text
Unnormalized Data (Redundant) ──> 1NF (Atomic Values) ──> 2NF (No Partial Dep) ──> 3NF (No Transitive Dep)
```

1. **First Normal Form (1NF)**:
   * **Rule**: Each column must contain atomic (indivisible) values, and there must be no repeating groups.
   * **मराठी**: प्रत्येक रकान्यात फक्त एकच व्हॅल्यू असावी (स्वतंत्र अक्षरे किंवा संख्या), स्वल्पविराम देऊन अनेक व्हॅल्यूज एकाच कॉलममध्ये लिहू नयेत.
2. **Second Normal Form (2NF)**:
   * **Rule**: Must be in 1NF and all non-key columns must be fully functionally dependent on the entire primary key (no partial dependency in composite keys).
   * **मराठी**: टेबल 1NF मध्ये असावे आणि कोणताही कॉलम संयुक्त प्रायमरी कीच्या फक्त एका भागावर अवलंबून नसावा, तर तो संपूर्ण प्रायमरी कीवर अवलंबून असावा.
3. **Third Normal Form (3NF)**:
   * **Rule**: Must be in 2NF and there must be no transitive dependencies (non-key columns depending on other non-key columns).
   * **मराठी**: टेबल 2NF मध्ये असावे आणि कोणताही नॉन-की कॉलम दुसऱ्या नॉन-की कॉलमवर अवलंबून नसावा (उदा. 'शहर' हा कॉलम 'पिनकोड' वर अवलंबून असल्यास तो वेगळ्या टेबलमध्ये असावा).
4. **Boyce-Codd Normal Form (BCNF)**:
   * **Rule**: A stronger version of 3NF. For any dependency $X \rightarrow Y$, $X$ must be a super key.
   * **मराठी**: 3NF ची अधिक कडक आवृत्ती; प्रत्येक फंक्शनल डिपेंडन्सीमध्ये डाव्या बाजूचा घटक (X) हा सुपर की असावा.

---

## 3. Data Warehouse Schemas: Star vs. Snowflake

In Big Data and Data Warehousing, we model tables into **Fact Tables** (numeric measurements) and **Dimension Tables** (descriptive characteristics).

### A. Star Schema (स्टार स्कीमा)
* **English**: Features a central Fact Table joined directly to denormalized Dimension Tables. It resembles a star shape. It requires fewer joins and offers fast queries.
* **मराठी**: यामध्ये मध्यभागी एक मुख्य फॅक्ट टेबल (Fact Table) असते जे थेट इतर डिनॉर्मलाईज्ड डायमेंशन टेबल्सशी (Dimension Tables) जोडलेले असते. याचा आकार ताऱ्यासारखा दिसतो. यामुळे कमी जॉइन्स लागतात आणि क्वेरीज वेगाने धावतात.

```text
       [ Customer_Dim ]
              │
[ Date_Dim ] ─┼─ [ Sales_Fact ] ─ [ Product_Dim ]
              │
        [ Store_Dim ]
```

### B. Snowflake Schema (स्नोफ्लेक स्कीमा)
* **English**: A normalized version of the Star Schema. The dimension tables are further split into sub-dimensions (normalized). It reduces data redundancy but requires more table joins, slowing down query speeds.
* **मराठी**: हा स्टार स्कीमाचा नॉर्मलाईज्ड (Normalized) अवतार आहे. यामध्ये डायमेंशन टेबल्सचे वर्गीकरण करून त्याचे पोट-डायमेंशन टेबल्स बनवले जातात. यामुळे मेमरीची बचत होते पण जास्त जॉइन्स लागल्यामुळे क्वेरीचा वेग कमी होतो.

```text
[ Category_SubDim ] ── [ Product_Dim ] ── [ Sales_Fact ]
```
