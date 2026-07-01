

# 📌 DATABASE DESIGN CASE STUDIES (STEP-BY-STEP APPROACH)

Database design ka standard workflow hota hai:

```text
Requirement Analysis
↓
Entities identify karo
↓
Attributes define karo
↓
Relationships identify karo
↓
Primary & Foreign keys decide karo
↓
Normalization apply karo
↓
Indexes plan karo
```

Ye approach interviews me expected hota hai ✅

---

# 1️⃣ CASE STUDY — COLLEGE MANAGEMENT SYSTEM

## Step 1: Requirements

System manage karega:

```text
Students
Courses
Teachers
Departments
Enrollments
```

---

## Step 2: Entities Identify

Entities:

```text
Student
Course
Teacher
Department
Enrollment
```

---

## Step 3: Tables Design

### STUDENT TABLE

```sql
CREATE TABLE student(
student_id INT PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(100),
dept_id INT
);
```

---

### COURSE TABLE

```sql
CREATE TABLE course(
course_id INT PRIMARY KEY,
course_name VARCHAR(50),
teacher_id INT
);
```

---

### TEACHER TABLE

```sql
CREATE TABLE teacher(
teacher_id INT PRIMARY KEY,
teacher_name VARCHAR(50),
dept_id INT
);
```

---

### DEPARTMENT TABLE

```sql
CREATE TABLE department(
dept_id INT PRIMARY KEY,
dept_name VARCHAR(50)
);
```

---

### ENROLLMENT TABLE (Many-to-Many Relationship)

```sql
CREATE TABLE enrollment(
student_id INT,
course_id INT,
PRIMARY KEY(student_id, course_id),
FOREIGN KEY(student_id) REFERENCES student(student_id),
FOREIGN KEY(course_id) REFERENCES course(course_id)
);
```

📌 Enrollment bridge table solves many-to-many relationship

---

# 2️⃣ CASE STUDY — E-COMMERCE DATABASE DESIGN

## Step 1: Requirements

System manage karega:

```text
Users
Products
Orders
Payments
Cart
Order Items
```

---

## Step 2: Tables Design

### USERS TABLE

```sql
CREATE TABLE users(
user_id INT PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(100) UNIQUE
);
```

---

### PRODUCTS TABLE

```sql
CREATE TABLE products(
product_id INT PRIMARY KEY,
product_name VARCHAR(100),
price DECIMAL(10,2),
stock INT
);
```

---

### ORDERS TABLE

```sql
CREATE TABLE orders(
order_id INT PRIMARY KEY,
user_id INT,
order_date DATE,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);
```

---

### ORDER_ITEMS TABLE

```sql
CREATE TABLE order_items(
order_id INT,
product_id INT,
quantity INT,
PRIMARY KEY(order_id, product_id),
FOREIGN KEY(order_id) REFERENCES orders(order_id),
FOREIGN KEY(product_id) REFERENCES products(product_id)
);
```

📌 Order_items handles multiple products per order

---

# 3️⃣ CASE STUDY — HOSPITAL MANAGEMENT SYSTEM

## Step 1: Requirements

Track karega:

```text
Patients
Doctors
Appointments
Departments
Treatments
```

---

## Step 2: Tables Design

### PATIENT TABLE

```sql
CREATE TABLE patient(
patient_id INT PRIMARY KEY,
name VARCHAR(50),
age INT,
phone VARCHAR(15)
);
```

---

### DOCTOR TABLE

```sql
CREATE TABLE doctor(
doctor_id INT PRIMARY KEY,
doctor_name VARCHAR(50),
dept_id INT
);
```

---

### APPOINTMENT TABLE

```sql
CREATE TABLE appointment(
appointment_id INT PRIMARY KEY,
patient_id INT,
doctor_id INT,
appointment_date DATE,
FOREIGN KEY(patient_id) REFERENCES patient(patient_id),
FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id)
);
```

---

# 4️⃣ PRIMARY KEY SELECTION STRATEGY

Primary key choose karte waqt rules:

```text
Unique hona chahiye
NULL allowed nahi hona chahiye
Stable hona chahiye
Short hona chahiye
```

Good example:

```text
student_id
order_id
product_id
```

Bad example:

```text
name
phone_number
email
```

---

# 5️⃣ FOREIGN KEY DESIGN STRATEGY

Foreign key define karta hai:

```text
Relationship between tables
Data consistency
Referential integrity
```

Example:

```sql
FOREIGN KEY(user_id)
REFERENCES users(user_id)
```

---

# 6️⃣ ONE-TO-ONE RELATIONSHIP DESIGN

Example:

```text
User ↔ Profile
```

Table structure:

```sql
CREATE TABLE profile(
profile_id INT PRIMARY KEY,
user_id INT UNIQUE,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);
```

---

# 7️⃣ ONE-TO-MANY RELATIONSHIP DESIGN

Example:

```text
Department → Employees
```

Implementation:

```sql
dept_id INT
FOREIGN KEY(dept_id)
REFERENCES department(dept_id)
```

---

# 8️⃣ MANY-TO-MANY RELATIONSHIP DESIGN

Example:

```text
Students ↔ Courses
```

Solution:

Bridge table

```sql
student_course(
student_id,
course_id
)
```

---

# 9️⃣ NORMALIZATION APPLY KARNA

Example problem table:

```text
student_id
student_name
course_name
teacher_name
```

Issues:

```text
duplicate data
update anomaly
insert anomaly
delete anomaly
```

Solution:

Split into:

```text
student table
course table
teacher table
enrollment table
```

---

# 🔟 INDEX STRATEGY DESIGN

Index lagana chahiye:

```text
Primary keys
Foreign keys
JOIN columns
WHERE clause columns
ORDER BY columns
```

Example:

```sql
CREATE INDEX idx_user_id
ON orders(user_id);
```

---

# 1️⃣1️⃣ DENORMALIZATION DECISION (REAL SYSTEM DESIGN)

Normalize when:

```text
transaction system
OLTP workload
data integrity important
```

Denormalize when:

```text
analytics queries
reporting dashboards
frequent joins slow ho rahe ho
```

---

# 1️⃣2️⃣ REAL INTERVIEW DESIGN QUESTION EXAMPLE

Question:

Design database for **Library Management System**

Solution:

Entities:

```text
Books
Members
Authors
Borrow Records
```

Tables:

```sql
books(book_id, title, author_id)

members(member_id, name)

authors(author_id, author_name)

borrow_records(
member_id,
book_id,
borrow_date,
return_date
)
```

Relationships:

```text
Author → Books (1-to-many)
Member → Borrow records (1-to-many)
Books ↔ Members (many-to-many via borrow_records)
```

---

# 🎯 DATABASE DESIGN INTERVIEW CHECKLIST

Always explain in this order:

```text
Identify entities
Define attributes
Set primary keys
Define relationships
Add foreign keys
Normalize tables
Add indexes


✅ **OLTP vs OLAP + Star Schema + Snowflake Schema + Data Warehouse Design Basics** — especially useful since you’re also working on Big Data topics.
