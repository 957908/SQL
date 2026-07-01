# 🎯 Level 06: Database Design Interview & Placement Prep

This prep sheet covers relational database schemas, normal forms, primary/foreign key constraints, and Star vs. Snowflake data warehouse designs.

---

## 1. Top Interview Questions & Answers

### Q1: What are Database Normalization anomalies? Explain insertion, update, and deletion anomalies.
* **How to answer**: Explain what happens when a database structure is poorly designed (redundant), causing data consistency errors.
* **Answer**:
  "Normalization anomalies are inconsistencies that occur in unnormalized tables:
  1. **Insertion Anomaly**: Being unable to insert a record because parent data is missing (e.g., cannot add a new course because no student has enrolled in it yet).
  2. **Update Anomaly**: If data is duplicated (e.g., customer address is stored in multiple rows), updating the address in one row but forgetting others leaves the database in an inconsistent state.
  3. **Deletion Anomaly**: Deleting a record accidentally destroys other unrelated data (e.g., deleting the only student enrolled in a class accidentally deletes all information about the class itself)."

### Q2: Compare Star Schema and Snowflake Schema in a Data Warehouse. Which is better for query performance?
* **How to answer**: Explain that Star has denormalized tables (few joins, fast queries), whereas Snowflake has normalized tables (more joins, slower queries).
* **Answer**:
  * **Star Schema**: Has a central fact table connected directly to denormalized dimension tables. It requires fewer joins, making it **highly optimized for query performance**.
  * **Snowflake Schema**: A normalized version of the Star Schema where dimension tables are split into sub-dimensions (e.g., Product $\rightarrow$ Sub-Category $\rightarrow$ Category). It reduces data redundancy (saves storage) but requires many table joins, which degrades query speed.

---

## 2. Placement Case Study / Design Problem

### Scenario:
You are designing a database for an **E-Commerce Orders System**.
A customer can place multiple orders, and each order can contain multiple products.

#### Task:
1. Identify the normalization level of the following table.
2. Re-design it to reach **Third Normal Form (3NF)**.

#### Unnormalized Table (`orders_raw`):
```text
+----------+-------------+------------------+------------+--------------+-----------+
| order_id | customer_id | customer_address | product_id | product_name | unit_price|
+----------+-------------+------------------+------------+--------------+-----------+
| 5001     | C01         | Mumbai, India    | P99        | Laptop       | 50000     |
| 5001     | C01         | Mumbai, India    | P98        | Mouse        | 1000      |
+----------+-------------+------------------+------------+--------------+-----------+
```
* **Analysis**: The table violates **1NF** if multiple products are grouped into single fields, and violates **2NF** and **3NF** because `customer_address` is dependent on `customer_id` (partial dependency) and `product_name` is dependent on `product_id`.

#### 3NF Normalized Design:
We split the raw table into 4 normalized tables:
1. **`customers`** table: `customer_id (PK)`, `customer_address`.
2. **`products`** table: `product_id (PK)`, `product_name`, `unit_price`.
3. **`orders`** table: `order_id (PK)`, `customer_id (FK)`, `order_date`.
4. **`order_items`** table: `order_id (FK)`, `product_id (FK)`, `quantity` (Composite PK: `order_id + product_id`).
