# 📚 Level 09: Transactions & Security (व्यवहार आणि सुरक्षा)

This module covers transaction control commands (TCL), the ACID properties of databases, concurrency locks, and user permissions security. (या मॉड्युलमध्ये आपण ट्रान्झॅक्शन्स, ACID नियम, लॉक प्रकार आणि युझर परवानग्या व्यवस्थापन शिकणार आहोत).

---

## 1. SQL Transactions: COMMIT, ROLLBACK, SAVEPOINT

A transaction is a single logical unit of work. Either all operations succeed (Commit), or none do (Rollback). (ट्रान्झॅक्शन म्हणजे कामाचा एक संच, जो एकतर संपूर्णपणे यशस्वी होतो किंवा काहीही बदल न करता पूर्ववत केला जातो).

```sql
-- Start Transaction
BEGIN;

-- Operation 1: Deduct from Sender
UPDATE accounts SET balance = balance - 1000.00 WHERE user_id = 101;

-- Savepoint creation (A checkpoint to roll back to if needed)
SAVEPOINT deducted;

-- Operation 2: Add to Receiver
UPDATE accounts SET balance = balance + 1000.00 WHERE user_id = 102;

-- If check fails (e.g. invalid receiver), rollback to savepoint
-- ROLLBACK TO SAVEPOINT deducted;

-- Final Commit to save changes permanently
COMMIT;
```

### Command Explanations:
* **`COMMIT`**: Saves all changes made during the transaction permanently to disk. (डेटाबेसमधील बदल कायमस्वरूपी जतन करतो).
* **`ROLLBACK`**: Cancels all changes and restores the database to the state it was in before the transaction started. (बदल रद्द करून डेटाबेस पूर्वीच्या स्थितीत आणतो).
* **`SAVEPOINT`**: Creates a marker inside a transaction to allow partial rollbacks. (ट्रान्झॅक्शनच्या मधोमध चेकपॉईंट तयार करतो जेणेकरून तिथपर्यंतचा बदल रद्द करता येईल).

---

## 2. ACID Properties (ACID नियम)

Reliable transaction processing is governed by four rules: (डेटाबेसच्या अचूकतेसाठी खालील ४ नियमांचे पालन केले जाते):

1. **Atomicity (अविभाज्यता)**: 
   * **English**: "All or Nothing". If any statement in a transaction fails, the entire transaction is rolled back.
   * **मराठी**: संपूर्ण व्यवहार पूर्ण होईल किंवा काहीच नाही. जर एकही क्वेरी चुकली, तर संपूर्ण बदल रद्द केले जातील.
2. **Consistency (सुसंगतता)**:
   * **English**: Ensures the database moves from one valid state to another, maintaining all schema constraints.
   * **मराठी**: व्यवहार सुरू होण्यापूर्वी आणि संपल्यानंतर डेटाबेसचे नियम (Constraints) पाळले गेले पाहिजेत.
3. **Isolation (विलगीकरण)**:
   * **English**: Concurrent transactions execute independently without interfering with each other.
   * **मराठी**: एकाच वेळी होणारे दोन व्यवहार एकमेकांच्या कामात अडथळा आणत नाहीत; ते एकमेकांपासून अलिप्त राहतात.
4. **Durability (टिकाऊपणा)**:
   * **English**: Once a transaction commits, the changes survive system failures (written permanently to disk).
   * **मराठी**: व्यवहार कमिट (Commit) झाल्यावर सर्व डेटा डिस्कवर कायमचा जतन होतो; लाईट गेल्यास किंवा सिस्टम क्रॅश झाल्यासही तो सुरक्षित राहतो.

---

## 3. Database Locks & Concurrency (लॉक्स आणि समवर्ती नियंत्रण)

To prevent multiple users from modifying the same data block simultaneously, databases apply locks: (एकाच वेळी अनेक युझर्सनी एकाच ओळीत बदल करू नये म्हणून लॉकचा वापर केला जातो):

* **Shared Lock (S-Lock / Read Lock)**: Allows multiple transactions to read a row but prevents modifications. (इतरांना फक्त वाचण्याची परवानगी देते, बदल करण्याची नाही).
* **Exclusive Lock (X-Lock / Write Lock)**: Prevents any other transaction from reading or writing to the locked row (e.g., applied during `UPDATE` or `DELETE`). (इतरांना वाचण्यास आणि लिहिण्यास पूर्ण बंदी घालते).
* **Deadlock (डेडलॉक)**: Occurs when transaction 1 holds a lock that transaction 2 needs, while transaction 2 holds a lock that transaction 1 needs. The database resolver must automatically abort one of the transactions. (दोन व्यवहार परस्परांच्या लॉक्स मोकळे होण्याची वाट पाहत अडकून राहण्याची कोंडी).

---

## 4. User Security: GRANT & REVOKE (युझर परवानग्या)

Controls access rights of database users. (डेटाबेस युझर्सच्या परवानग्या नियंत्रित करण्यासाठी).

```sql
-- Create a new database role
CREATE USER read_only_analyst WITH PASSWORD 'SecurePass123';

-- Grant SELECT access on table to user
GRANT SELECT ON employees TO read_only_analyst;

-- Revoke DELETE access on table
REVOKE DELETE ON employees FROM read_only_analyst;
```
* **How it works (English)**: Creates a new user profile and allocates read-only access on the table. It explicitly revokes delete permissions for safety.
* **हे कसे काम करते (मराठी)**: हे नवीन युझर खाते तयार करते आणि त्याला टेबल वाचण्याची परवानगी (`GRANT SELECT`) देते. चुकीचे डिलीट रोखण्यासाठी डिलीट करण्याची परवानगी काढून घेते (`REVOKE DELETE`).
