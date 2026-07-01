# 🎯 Level 09: Transactions & Security Interview & Placement Prep

This prep sheet covers transactional states, ACID guarantees, database lock concurrency, and user roles security.

---

## 1. Top Interview Questions & Answers

### Q1: What are isolation levels in SQL transactions? Explain Dirty Read, Non-Repeatable Read, and Phantom Read.
* **How to answer**: Explain that isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) control visibility between concurrent transactions.
* **Answer**:
  * **Dirty Read**: Transaction A reads uncommitted updates made by Transaction B. If B rolls back, A has processed invalid data. (Prevented by `Read Committed`).
  * **Non-Repeatable Read**: Transaction A reads a row. Transaction B updates that row and commits. Transaction A reads it again and finds different values. (Prevented by `Repeatable Read`).
  * **Phantom Read**: Transaction A queries a range of rows. Transaction B inserts new rows matching the filter and commits. Transaction A re-runs the query and finds new 'phantom' rows. (Prevented by `Serializable`).

### Q2: What is the difference between Shared Locks and Exclusive Locks?
* **How to answer**: Compare read and write access rules for concurrent users.
* **Answer**:
  * **Shared Lock (S-Lock)**: Acquired during read operations. Multiple transactions can hold shared locks on the same row concurrently, allowing them to read. Writes are blocked.
  * **Exclusive Lock (X-Lock)**: Acquired during update/delete operations. Only one transaction can hold an exclusive lock on a row. It blocks other transactions from both reading and writing to that row.

---

## 2. Placement Coding Challenge

### Scenario:
Implement a bank transfer transaction query that moves $500 from Account 101 to Account 102.
If the update fails or the sender has insufficient funds, ensure the entire operation rolls back safely.

#### Transaction Query Solution:
```sql
BEGIN;

-- Check balance first
-- (In application code, verify balance >= 500)

-- Deduct from sender
UPDATE accounts 
SET balance = balance - 500.00 
WHERE account_id = 101 AND balance >= 500.00;

-- Verify if exactly 1 row was updated (if 0, it means insufficient funds)
-- If check fails, rollback immediately:
-- ROLLBACK;

-- Add to receiver
UPDATE accounts 
SET balance = balance + 500.00 
WHERE account_id = 102;

-- Commit if both succeeded
COMMIT;
```
