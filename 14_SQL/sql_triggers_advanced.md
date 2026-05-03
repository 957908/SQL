
```sql
14_SQL/sql_triggers_advanced.md
```

---

# 📌 TRIGGER KYA HOTA HAI?

Trigger = automatic SQL block jo execute hota hai jab:

```text
INSERT
UPDATE
DELETE
```

table par run hota hai.

Example:

```text
Employee insert hua → automatically log table update ho gaya
```

---

# 1️⃣ TRIGGER TYPES (EXAM IMPORTANT)

| Type       | Meaning                         |
| ---------- | ------------------------------- |
| BEFORE     | event ke pehle execute hota hai |
| AFTER      | event ke baad execute hota hai  |
| INSTEAD OF | view par execute hota hai       |

---

# 2️⃣ BEFORE INSERT TRIGGER

Example: salary automatically increase before insert

```sql
CREATE TRIGGER before_insert_emp
BEFORE INSERT
ON employee
FOR EACH ROW
BEGIN
   SET NEW.salary = NEW.salary + 1000;
END;
```

Explanation:

```text
Insert hone se pehle salary modify hogi
```

---

# 3️⃣ AFTER INSERT TRIGGER

Example: insert hone ke baad log table update

```sql
CREATE TRIGGER after_insert_emp
AFTER INSERT
ON employee
FOR EACH ROW
BEGIN
   INSERT INTO employee_log(emp_id)
   VALUES(NEW.id);
END;
```

Keyword:

```text
NEW = inserted record
```

---

# 4️⃣ AFTER DELETE TRIGGER

Example: deleted record log karna

```sql
CREATE TRIGGER after_delete_emp
AFTER DELETE
ON employee
FOR EACH ROW
BEGIN
   INSERT INTO delete_log(emp_id)
   VALUES(OLD.id);
END;
```

Keyword:

```text
OLD = deleted record
```

---

# 5️⃣ BEFORE UPDATE TRIGGER

Example: salary negative hone se prevent karna

```sql
CREATE TRIGGER before_update_salary
BEFORE UPDATE
ON employee
FOR EACH ROW
BEGIN
   IF NEW.salary < 0 THEN
      SET NEW.salary = 0;
   END IF;
END;
```

Validation trigger example ✅

---

# 6️⃣ ROW LEVEL TRIGGER vs STATEMENT LEVEL TRIGGER

## Row Level Trigger

Runs for every row

```sql
FOR EACH ROW
```

Example:

```text
5 rows insert → trigger runs 5 times
```

---

## Statement Level Trigger

Runs once per query

Example:

```text
5 rows insert → trigger runs 1 time
```

Syntax (Oracle):

```sql
CREATE TRIGGER example_trigger
AFTER INSERT ON employee
BEGIN
   DBMS_OUTPUT.PUT_LINE('Inserted');
END;
```

---

# 7️⃣ AUDIT TRIGGER (VERY IMPORTANT)

Tracks table activity

Example:

```sql
CREATE TRIGGER audit_salary_change
AFTER UPDATE
ON employee
FOR EACH ROW
BEGIN
   INSERT INTO salary_audit(emp_id, old_salary, new_salary)
   VALUES(OLD.id, OLD.salary, NEW.salary);
END;
```

Stores:

```text
old value
new value
```

---

# 8️⃣ PREVENT DELETE TRIGGER

Example: restrict delete operation

```sql
CREATE TRIGGER prevent_delete
BEFORE DELETE
ON employee
FOR EACH ROW
BEGIN
   SIGNAL SQLSTATE '45000'
   SET MESSAGE_TEXT = 'Delete not allowed';
END;
```

Security trigger example 🔒

---

# 9️⃣ INSTEAD OF TRIGGER (VIEW PAR USE HOTA HAI)

Example:

```sql
CREATE TRIGGER instead_of_insert_view
INSTEAD OF INSERT
ON emp_view
FOR EACH ROW
BEGIN
   INSERT INTO employee(id,name)
   VALUES(NEW.id, NEW.name);
END;
```

Used when:

```text
view directly insert allow nahi karta
```

---

# 🔟 MULTIPLE EVENTS TRIGGER

Example:

```sql
CREATE TRIGGER multi_event_trigger
AFTER INSERT OR DELETE OR UPDATE
ON employee
FOR EACH ROW
BEGIN
   INSERT INTO activity_log
   VALUES('Table Modified');
END;
```

---

# 1️⃣1️⃣ CHECK SALARY RANGE TRIGGER

Example:

```sql
CREATE TRIGGER salary_validation
BEFORE INSERT
ON employee
FOR EACH ROW
BEGIN
   IF NEW.salary < 10000 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Salary too low';
   END IF;
END;
```

---

# 1️⃣2️⃣ AUTO TIMESTAMP TRIGGER

Example:

```sql
CREATE TRIGGER update_timestamp
BEFORE UPDATE
ON employee
FOR EACH ROW
BEGIN
   SET NEW.last_modified = NOW();
END;
```

Automatically update timestamp column

---

# 1️⃣3️⃣ TRIGGER DELETE COMMAND

Remove trigger

```sql
DROP TRIGGER before_insert_emp;
```

---

# 1️⃣4️⃣ SHOW TRIGGERS

List triggers

```sql
SHOW TRIGGERS;
```

---

# 1️⃣5️⃣ TRIGGER VS STORED PROCEDURE DIFFERENCE

| Feature     | Trigger     | Procedure    |
| ----------- | ----------- | ------------ |
| Execution   | automatic   | manual       |
| Call method | event-based | CALL command |
| Control     | database    | user         |

---

# 🎯 MOST IMPORTANT TRIGGER EXAM TRAPS

Yaad rakhna:

```text
Trigger automatic execute hota hai
NEW keyword inserted value ke liye
OLD keyword deleted value ke liye
BEFORE trigger validation ke liye use hota hai
AFTER trigger logging ke liye use hota hai
FOR EACH ROW = row-level trigger
INSTEAD OF trigger view par use hota hai


✅ **Indexes Advanced + Query Optimization + Execution Plan + Performance Tuning**
jo interviews me “How to speed up SQL queries?” question ka answer hota hai.
