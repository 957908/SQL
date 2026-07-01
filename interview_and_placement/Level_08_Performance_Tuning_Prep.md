# 🎯 Level 08: Performance Tuning Interview & Placement Prep

This prep sheet covers indexing models, query execution plans, and performance tuning strategies.

---

## 1. Top Interview Questions & Answers

### Q1: Compare Clustered and Non-Clustered Indexes. Why can a table only have one Clustered Index?
* **How to answer**: Explain physical storage order. Since rows can only be physically sorted in one way, you can only have one clustered index.
* **Answer**:
  * **Clustered Index**: Sorts the actual physical data rows of the table on disk by the index key. Because physical data can only be sorted in one order, a table can only have **one** clustered index.
  * **Non-Clustered Index**: Does not sort the physical table data. It creates a separate structure (like a lookup table) containing the index key and pointers (physical addresses) to the corresponding data rows. You can have **multiple** non-clustered indexes.

### Q2: What is the difference between a Scan and a Seek in an execution plan?
* **How to answer**: Seek is efficient ($O(\log N)$) whereas Scan is inefficient ($O(N)$).
* **Answer**:
  * **Index Scan**: The database engine reads the entire index tree sequentially. It is better than a full table scan but still reads all rows.
  * **Index Seek**: The database engine uses the index tree to search and jump directly to matching rows using binary search tree paths. It is highly optimized and much faster than a scan.

---

## 2. Placement Case Study / Optimization Problem

### Scenario:
A production query is running extremely slowly on a table containing 10 million transactions:
```sql
SELECT customer_id, SUM(amount)
FROM transactions
WHERE transaction_date BETWEEN '2026-01-01' AND '2026-06-30'
GROUP BY customer_id;
```

#### Diagnostic:
Running `EXPLAIN` shows:
`-> Seq Scan on transactions (cost=0.00..234120.00 rows=4821210 width=16)`
The engine is scanning all 10 million rows sequentially from disk.

#### Task:
Suggest two optimization steps to speed up this query.

#### Solution:
1. **Create an Index**:
   We create a composite index on the date and customer ID columns to allow the database to perform an index range scan instead of a full table scan:
   ```sql
   CREATE INDEX idx_trans_date_cust ON transactions(transaction_date, customer_id);
   ```
2. **Table Partitioning**:
   If queries always look for date ranges, partition the `transactions` table by **Range** using `transaction_date` (e.g., partition by year or month). The database optimizer will prune partitions, reading only the relevant partition disk blocks.
