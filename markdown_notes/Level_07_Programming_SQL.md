# 📚 Level 07: Programming SQL (प्रोग्रामिंग SQL आणि पीएल/एसक्यूएल)

This module covers writing procedural programs in database engines using Stored Procedures, User-Defined Functions, Triggers, Cursors, and Exception Handling blocks. (या मॉड्युलमध्ये आपण डेटाबेसमध्ये प्रोग्रामिंग करणे जसे की प्रोसिजर्स, फंक्शन्स, ट्रिगर्स आणि कर्सर वापरणे शिकणार आहोत).

---

## 1. Stored Procedures vs. Functions (स्टोर्ड प्रोसिजर्स आणि फंक्शन्स)

### A. Stored Procedure (स्टोर्ड प्रोसिजर)
A set of SQL statements that can be saved and reused. It can accept parameters and does not need to return a value. (डेटाबेसमध्ये साठवलेला कोड ब्लॉक जो कॉल करून पुन्हा-पुन्हा वापरता येतो).

```sql
-- Procedure creation syntax (PostgreSQL / PL-pgSQL example)
CREATE OR REPLACE PROCEDURE update_emp_salary(
    p_emp_id INT,
    p_increment DECIMAL
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE employees
    SET salary = salary + p_increment
    WHERE emp_id = p_emp_id;
    
    COMMIT;
END;
$$;

-- Call the procedure
CALL update_emp_salary(101, 5000.00);
```

### B. User-Defined Function (युझर-डिफाइंड फंक्शन)
Must return a single value and can be called directly inside a `SELECT` statement. (असा कोड जो बंधनकारकपणे एक मूल्य रिटर्न करतो आणि थेट सिलेक्ट क्वेरीमध्ये वापरता येतो).

```sql
CREATE OR REPLACE FUNCTION get_annual_salary(p_emp_id INT)
RETURNS DECIMAL
LANGUAGE plpgsql AS $$
DECLARE
    v_salary DECIMAL;
BEGIN
    SELECT salary INTO v_salary FROM employees WHERE emp_id = p_emp_id;
    RETURN v_salary * 12;
END;
$$;

-- Call the function inside a SELECT statement
SELECT name, get_annual_salary(emp_id) AS yearly_package FROM employees;
```

### Key Differences (मुख्य फरक):
* **Procedures**: Can perform transaction operations (`COMMIT`/`ROLLBACK`). Cannot be used inside a SELECT query. (यामध्ये कमिट/रोलबॅक करता येते; सिलेक्ट क्वेरीमध्ये वापरता येत नाही).
* **Functions**: Cannot execute transactions (`COMMIT`/`ROLLBACK`). Must return a value. Can be used inside a SELECT query. (यामध्ये कमिट करता येत नाही; मूल्य रिटर्न करणे बंधनकारक आहे आणि सिलेक्ट क्वेरीमध्ये वापरता येते).

---

## 2. Database Triggers (डेटाबेस ट्रिगर्स)

A trigger is a block of code that automatically executes in response to certain events (like `INSERT`, `UPDATE`, or `DELETE`) on a particular table. (टेबलमध्ये कोणतीही क्रिया (Insert, Update, Delete) होताच आपोआप धावणारा कोड ब्लॉक).

```sql
-- Trigger Function
CREATE OR REPLACE FUNCTION log_salary_changes()
RETURNS TRIGGER 
LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.salary <> OLD.salary THEN
        INSERT INTO salary_audit_logs (emp_id, old_salary, new_salary, change_date)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary, CURRENT_TIMESTAMP);
    END IF;
    RETURN NEW;
END;
$$;

-- Create Trigger binding to table
CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION log_salary_changes();
```
* **How it works (English)**: Whenever an `UPDATE` happens on the `employees` table, this trigger fires automatically, detects if the salary changed, and inserts the audit record into `salary_audit_logs`.
* **हे कसे काम करते (मराठी)**: जेव्हा जेव्हा 'employees' टेबलमधील पगार बदलला जाईल, तेव्हा हे ट्रिगर आपोआप सक्रिय होईल आणि बदललेला पगार मोजून जुना व नवीन पगार वेळ-दिनांकासह ऑडिट टेबलमध्ये नोंदवेल.

---

## 3. Cursors & Exception Handling (कर्सर आणि एक्सेप्शन हँडलिंग)

### A. Cursors (कर्सर)
Used to process query results row-by-row sequentially. (रिझल्ट सेटमधील प्रत्येक ओळीवर जाऊन एकेक करून प्रक्रिया करण्यासाठी).

```sql
CREATE OR REPLACE PROCEDURE process_bonuses()
LANGUAGE plpgsql AS $$
DECLARE
    emp_record RECORD;
    -- Define Cursor
    emp_cursor CURSOR FOR SELECT emp_id, salary FROM employees;
BEGIN
    OPEN emp_cursor;
    LOOP
        FETCH emp_cursor INTO emp_record;
        EXIT WHEN NOT FOUND;
        
        -- Apply custom business logic per row
        UPDATE employees SET bonus = emp_record.salary * 0.1 WHERE emp_id = emp_record.emp_id;
    END LOOP;
    CLOSE emp_cursor;
END;
$$;
```

### B. Exception Handling (एरर हँडलिंग)
Handles runtime errors gracefully to prevent script crashes. (प्रोग्राम रन होताना येणारे एरर थांबवून योग्य संदेश दाखवण्यासाठी).

```sql
BEGIN
    -- Code execution
    INSERT INTO employees (emp_id, name) VALUES (101, 'Duplicate ID');
EXCEPTION
    -- Catch Primary Key violation error
    WHEN unique_violation THEN
        RAISE NOTICE 'Error: Employee ID already exists!';
END;
```
