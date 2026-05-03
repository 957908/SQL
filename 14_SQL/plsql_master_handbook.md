
```sql
14_SQL/plsql_master_handbook.md
```

---

# 📌 PL/SQL KYA HOTA HAI?

PL/SQL = **Procedural Language extension of SQL**

SQL:

```sql
SELECT * FROM employee;
```

PL/SQL:

```text
IF condition THEN
LOOP
VARIABLE
FUNCTION
EXCEPTION HANDLING
```

Matlab SQL + programming features together

---

# 1️⃣ BASIC PL/SQL BLOCK STRUCTURE

Structure:

```sql
DECLARE
   -- variable declaration
BEGIN
   -- executable statements
EXCEPTION
   -- error handling
END;
/
```

Example:

```sql
DECLARE
   emp_name VARCHAR2(50);
BEGIN
   SELECT name INTO emp_name
   FROM employee
   WHERE id = 1;

   DBMS_OUTPUT.PUT_LINE(emp_name);
END;
/
```

Explanation:

```text
DECLARE → variables
BEGIN → logic
EXCEPTION → error handling
END → block close
```

---

# 2️⃣ VARIABLES IN PL/SQL

Example:

```sql
DECLARE
   salary NUMBER := 50000;
BEGIN
   DBMS_OUTPUT.PUT_LINE(salary);
END;
/
```

Variable assign karne ka syntax:

```text
variable_name datatype := value;
```

---

# 3️⃣ IF CONDITION IN PL/SQL

Example:

```sql
DECLARE
   salary NUMBER := 60000;
BEGIN

   IF salary > 50000 THEN
      DBMS_OUTPUT.PUT_LINE('High Salary');
   END IF;

END;
/
```

---

# 4️⃣ IF ELSE CONDITION

Example:

```sql
DECLARE
   salary NUMBER := 30000;
BEGIN

   IF salary > 50000 THEN
      DBMS_OUTPUT.PUT_LINE('High Salary');
   ELSE
      DBMS_OUTPUT.PUT_LINE('Low Salary');
   END IF;

END;
/
```

---

# 5️⃣ LOOP IN PL/SQL

Example:

```sql
BEGIN

   FOR i IN 1..5 LOOP
      DBMS_OUTPUT.PUT_LINE(i);
   END LOOP;

END;
/
```

Output:

```text
1
2
3
4
5
```

---

# 6️⃣ WHILE LOOP

Example:

```sql
DECLARE
   i NUMBER := 1;
BEGIN

   WHILE i <= 5 LOOP
      DBMS_OUTPUT.PUT_LINE(i);
      i := i + 1;
   END LOOP;

END;
/
```

---

# 7️⃣ PL/SQL FUNCTION

Function returns value

Example:

```sql
CREATE OR REPLACE FUNCTION get_salary(empid NUMBER)
RETURN NUMBER
IS
   emp_salary NUMBER;
BEGIN

   SELECT salary INTO emp_salary
   FROM employee
   WHERE id = empid;

   RETURN emp_salary;

END;
/
```

Run function:

```sql
SELECT get_salary(1) FROM dual;
```

---

# 8️⃣ PL/SQL PROCEDURE VS FUNCTION DIFFERENCE

| Feature      | Procedure  | Function     |
| ------------ | ---------- | ------------ |
| Return value | optional   | mandatory    |
| Call method  | CALL       | SELECT       |
| Usage        | operations | calculations |

---

# 9️⃣ EXCEPTION HANDLING (VERY IMPORTANT)

Handles runtime errors

Example:

```sql
DECLARE
   emp_salary NUMBER;
BEGIN

   SELECT salary INTO emp_salary
   FROM employee
   WHERE id = 10;

EXCEPTION

   WHEN NO_DATA_FOUND THEN
      DBMS_OUTPUT.PUT_LINE('Employee not found');

END;
/
```

---

# 🔟 MULTIPLE EXCEPTION HANDLING

Example:

```sql
DECLARE
   emp_salary NUMBER;
BEGIN

   SELECT salary INTO emp_salary
   FROM employee
   WHERE id = 1;

EXCEPTION

   WHEN NO_DATA_FOUND THEN
      DBMS_OUTPUT.PUT_LINE('No record found');

   WHEN TOO_MANY_ROWS THEN
      DBMS_OUTPUT.PUT_LINE('Multiple rows returned');

END;
/
```

---

# 1️⃣1️⃣ USER-DEFINED EXCEPTION

Example:

```sql
DECLARE
   salary NUMBER := 20000;
   low_salary EXCEPTION;
BEGIN

   IF salary < 30000 THEN
      RAISE low_salary;
   END IF;

EXCEPTION

   WHEN low_salary THEN
      DBMS_OUTPUT.PUT_LINE('Salary too low');

END;
/
```

---

# 1️⃣2️⃣ PACKAGES IN PL/SQL

Package = group of procedures + functions

Structure:

```sql
CREATE PACKAGE emp_package AS

PROCEDURE get_emp;

END emp_package;
/
```

Package body:

```sql
CREATE PACKAGE BODY emp_package AS

PROCEDURE get_emp IS
BEGIN
   DBMS_OUTPUT.PUT_LINE('Employee Data');
END;

END emp_package;
/
```

Run package:

```sql
EXEC emp_package.get_emp;
```

---

# 1️⃣3️⃣ CURSOR IN PL/SQL

Example:

```sql
DECLARE

CURSOR emp_cursor IS
SELECT name FROM employee;

emp_name employee.name%TYPE;

BEGIN

OPEN emp_cursor;

LOOP

FETCH emp_cursor INTO emp_name;

EXIT WHEN emp_cursor%NOTFOUND;

DBMS_OUTPUT.PUT_LINE(emp_name);

END LOOP;

CLOSE emp_cursor;

END;
/
```

---

# 1️⃣4️⃣ CURSOR ATTRIBUTES (IMPORTANT)

| Attribute | Meaning            |
| --------- | ------------------ |
| %FOUND    | row fetched        |
| %NOTFOUND | no row fetched     |
| %ROWCOUNT | rows processed     |
| %ISOPEN   | cursor open or not |

Example:

```sql
EXIT WHEN emp_cursor%NOTFOUND;
```

---

# 🎯 MOST IMPORTANT PL/SQL EXAM TRAPS

Yaad rakhna:

```text
PL/SQL block = DECLARE BEGIN EXCEPTION END
Function must return value
Procedure may or may not return value
NO_DATA_FOUND exception common hai
Cursor processes rows one-by-one
Packages group procedures/functions
%ROWCOUNT counts fetched rows
```

