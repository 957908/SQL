/* 🧠 SQL Mastery Academy: Interactive JS Controller & SQL Parser Engine */

// ==========================================
// 1. Mock Database Datasets
// ==========================================
const MOCK_DB = {
    employees: [
        { emp_id: 101, name: 'Amit Sharma', age: 28, salary: 55000.00, dept_id: 10, join_date: '2026-01-15' },
        { emp_id: 102, name: 'Pooja Patel', age: 32, salary: 70000.00, dept_id: 20, join_date: '2025-11-01' },
        { emp_id: 103, name: 'Rohit Sen', age: 25, salary: 65000.00, dept_id: 10, join_date: '2026-03-01' },
        { emp_id: 104, name: 'Neha Das', age: 29, salary: 80000.00, dept_id: 20, join_date: '2026-02-10' },
        { emp_id: 105, name: 'Raj Kumar', age: 35, salary: 45000.00, dept_id: 30, join_date: '2026-04-18' }
    ],
    departments: [
        { dept_id: 10, dept_name: 'IT' },
        { dept_id: 20, dept_name: 'Sales' },
        { dept_id: 30, dept_name: 'Marketing' }
    ],
    projects: [
        { project_id: 1, project_name: 'E-Commerce App' },
        { project_id: 2, project_name: 'CRM System' },
        { project_id: 3, project_name: 'Analytics Dashboard' }
    ],
    sales: [
        { sale_id: 1, sale_date: '2026-01-10', amount: 1000.00, customer_id: 'C01' },
        { sale_id: 2, sale_date: '2026-01-15', amount: 2000.00, customer_id: 'C02' },
        { sale_id: 3, sale_date: '2026-02-05', amount: 4500.00, customer_id: 'C01' },
        { sale_id: 4, sale_date: '2026-02-28', amount: 1500.00, customer_id: 'C03' },
        { sale_id: 5, sale_date: '2026-03-12', amount: 9000.00, customer_id: 'C02' }
    ]
};

// ==========================================
// 2. Bilingual Course Database (Levels 1-10)
// ==========================================
const COURSE_DATABASE = {
    1: {
        title: "Level 01: SQL Fundamentals",
        subtitle: "Start your journey with databases and basic table queries.",
        topics: [
            {
                title: "What is SQL and DBMS? (SQL आणि DBMS म्हणजे काय?)",
                query: "-- Example select query\nSELECT * FROM employees;",
                en: "DBMS (Database Management System) manages storage files. SQL is the relational language used to communicate and filter tables.",
                mr: "DBMS डेटाबेस फाईल्स साठवतो. SQL ही डेटाबेसशी संवाद साधून डेटा फिल्टर करण्यासाठी वापरली जाणारी भाषा आहे."
            },
            {
                title: "SELECT & WHERE (निवडणे आणि फिल्टर लावणे)",
                query: "SELECT name, salary \nFROM employees \nWHERE salary > 50000.00;",
                en: "Retrieves specific columns (name, salary) and filters rows where salary exceeds 50,000.",
                mr: "नाव आणि पगाराचे रकाने दाखवते आणि पगार ५०००० पेक्षा जास्त असलेल्या कर्मचाऱ्यांचा डेटा फिल्टर करते."
            },
            {
                title: "ORDER BY & LIMIT (क्रम लावणे आणि ओळी मर्यादित करणे)",
                query: "SELECT * FROM employees \nORDER BY salary DESC \nLIMIT 3;",
                en: "Sorts records in descending order (highest first) and limits the output to 3 rows.",
                mr: "पगाराच्या उतरत्या क्रमाने (मोठ्याकडून लहानाकडे) क्रम लावून फक्त पहिल्या ३ ओळी दाखवते."
            }
        ],
        qa: [
            {
                q: "What is the difference between DELETE and TRUNCATE?",
                a: "DELETE is a DML command that deletes rows one-by-one and can be rolled back. TRUNCATE is a DDL command that de-allocates entire pages, making it faster, but it deletes all records without filtering."
            },
            {
                q: "What is a Primary Key?",
                a: "A Primary Key is a unique identifier column in a table. It cannot contain duplicate values and cannot contain NULL values."
            }
        ]
    },
    2: {
        title: "Level 02: Intermediate SQL",
        subtitle: "Master range filters, logical aggregations, and NULL values.",
        topics: [
            {
                title: "Pattern Matching with LIKE (LIKE वाईल्डकार्ड)",
                query: "SELECT * FROM employees \nWHERE name LIKE 'A%';",
                en: "Finds rows where the name begins with the character 'A' (uses % as zero-or-more characters wildcard).",
                mr: "ज्या कर्मचाऱ्यांचे नाव 'A' अक्षराने सुरू होते त्यांची यादी दाखवते (% वाईल्डकार्ड म्हणून वापरला आहे)."
            },
            {
                title: "Aggregate Functions & GROUP BY (एकत्रीकरण आणि ग्रुपिंग)",
                query: "SELECT dept_id, COUNT(*) AS total_staff, AVG(salary) AS avg_sal \nFROM employees \nGROUP BY dept_id;",
                en: "Calculates total employee counts and average salaries grouped per department.",
                mr: "प्रत्येक डिपार्टमेंटनुसार कर्मचारी संख्या आणि सरासरी पगार मोजून दाखवते."
            },
            {
                title: "HAVING Constraint (ग्रुपवर अट लावणे)",
                query: "SELECT dept_id, AVG(salary) AS avg_sal \nFROM employees \nGROUP BY dept_id \nHAVING AVG(salary) > 50000.00;",
                en: "Filters groups after grouping is executed. Only displays departments with average salary above 50,000.",
                mr: "ग्रुप तयार झाल्यानंतर अट लावते. फक्त ५०००० पेक्षा जास्त सरासरी पगार असणारे डिपार्टमेंट्स दाखवते."
            }
        ],
        qa: [
            {
                q: "What is the difference between WHERE and HAVING?",
                a: "WHERE filters rows before they are grouped. HAVING filters aggregated groups after the GROUP BY clause runs."
            },
            {
                q: "How do you check for empty/NULL values in SQL?",
                a: "Use the 'IS NULL' or 'IS NOT NULL' syntax. Normal operators like '= NULL' do not work."
            }
        ]
    },
    3: {
        title: "Level 03: Table Joins",
        subtitle: "Combine data from multiple tables using shared primary/foreign keys.",
        topics: [
            {
                title: "INNER JOIN (आंतरिक जॉईन)",
                query: "SELECT e.name, d.dept_name \nFROM employees e \nINNER JOIN departments d \nON e.dept_id = d.dept_id;",
                en: "Returns records only when the department ID matches in both the employees and departments tables.",
                mr: "दोन्ही टेबल्समध्ये मॅच होणारा विभाग आयडी असलेला डेटा जोडतो आणि कर्मचारी व विभाग नाव दाखवतो."
            },
            {
                title: "LEFT JOIN (डावे जॉईन)",
                query: "SELECT e.name, d.dept_name \nFROM employees e \nLEFT JOIN departments d \nON e.dept_id = d.dept_id;",
                en: "Returns all employees. If an employee does not have a department, the department name shows as NULL.",
                mr: "सर्व कर्मचाऱ्यांची नावे दाखवतो. मॅच न होणाऱ्या विभागांसाठी NULL (रिकामा) रकाना दिसतो."
            }
        ],
        qa: [
            {
                q: "What is a Self Join?",
                a: "A Self Join is a normal join where a table is joined with itself. It is used to query hierarchical data in the same table, like matching employees to their managers."
            },
            {
                q: "What is a Cross Join?",
                a: "A Cross Join returns the Cartesian product of two tables, pairing every row of the first table with every row of the second table."
            }
        ]
    },
    4: {
        title: "Level 04: Advanced SQL",
        subtitle: "Optimize queries with CTEs, subqueries, and set operators.",
        topics: [
            {
                title: "Subqueries (सबक्वेरी)",
                query: "SELECT name, salary FROM employees \nWHERE salary > (SELECT AVG(salary) FROM employees);",
                en: "Finds employees earning above the company-wide average salary. The inner query runs first.",
                mr: "कंपनीच्या सरासरी पगारापेक्षा जास्त पगार असणारे कर्मचारी शोधते. आतील क्वेरी आधी सरासरी पगार मोजते."
            },
            {
                title: "Common Table Expression (CTE)",
                query: "WITH AvgSal AS (\n  SELECT AVG(salary) as val FROM employees\n)\nSELECT name, salary FROM employees, AvgSal \nWHERE salary > AvgSal.val;",
                en: "Creates a temporary named result set (AvgSal) which is joined to retrieve employees earning above average.",
                mr: "तात्पुरते 'AvgSal' टेबल तयार करते ज्याचा वापर करून सरासरीपेक्षा जास्त पगार असलेले कर्मचारी मिळवता येतात."
            }
        ],
        qa: [
            {
                q: "What is the difference between UNION and UNION ALL?",
                a: "UNION combines results and removes duplicates (requiring sorting, which is slower). UNION ALL combines results keeping duplicates (no sorting, which is faster)."
            },
            {
                q: "What is a Correlated Subquery?",
                a: "A subquery that references columns from the outer query. It runs repeatedly, once for each row processed by the outer query."
            }
        ]
    },
    5: {
        title: "Level 05: Window Functions",
        subtitle: "Perform aggregate calculations over groups without collapsing rows.",
        topics: [
            {
                title: "DENSE_RANK() (रँक देणे)",
                query: "SELECT name, department, salary, \nDENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank \nFROM employees;",
                en: "Ranks employees by salary within their departments. Duplicate salaries receive the same rank without gaps (e.g. 1, 2, 2, 3).",
                mr: "डिपार्टमेंटनुसार कर्मचाऱ्यांच्या पगाराला रँक देते. समान पगाराला समान रँक मिळते आणि पुढील रँक वगळली जात नाही."
            },
            {
                title: "LAG() and LEAD() (मागील आणि पुढील डेटा)",
                query: "SELECT name, salary, \nLAG(salary, 1, 0) OVER (ORDER BY salary DESC) as prev_sal \nFROM employees;",
                en: "Retrieves the salary of the person immediately earning more (the previous row in sorted order).",
                mr: "चढत्या/उतरत्या क्रमानुसार मागील ओळीतील पगार दाखवते (LAG). पुढील ओळीसाठी LEAD वापरतात."
            }
        ],
        qa: [
            {
                q: "What is the difference between RANK() and DENSE_RANK()?",
                a: "RANK() leaves gaps when duplicate ranks exist (e.g., 1, 2, 2, 4). DENSE_RANK() does not leave gaps (e.g., 1, 2, 2, 3)."
            },
            {
                q: "What is the purpose of OVER() clause?",
                a: "The OVER() clause defines the window or partition of rows over which the analytic function operates."
            }
        ]
    },
    6: {
        title: "Level 06: Database Design",
        subtitle: "Learn keys, normalization constraints, and warehouse star schemas.",
        topics: [
            {
                title: "Composite Primary Key (संयुक्त प्रायमरी की)",
                query: "-- Create table assignment schema\n-- PRIMARY KEY (emp_id, project_id)",
                en: "Enforces unique entries using a combination of two columns (e.g. assigning an employee to a project).",
                mr: "दोन किंवा अधिक कॉलम्स एकत्र करून युनिक प्रायमरी की बनवली जाते, जेणेकरून ओळीची पुनरावृत्ती होणार नाही."
            },
            {
                title: "Star vs. Snowflake Schema (डेटा वेअरहाऊस मॉडेल्स)",
                query: "-- Fact Table joins to Dimension Tables",
                en: "Star schema features denormalized, fast query dimensions. Snowflake schema features normalized, storage-saving dimensions.",
                mr: "स्टार स्कीमामध्ये फॅक्ट टेबल थेट डिनॉर्मलाईज्ड टेबल्सशी जोडलेले असते (वेगवान). स्नोफ्लेक स्कीमामध्ये जोडण्यांचे जाळे असते (नॉर्मलाईज्ड)."
            }
        ],
        qa: [
            {
                q: "Explain 1NF, 2NF, and 3NF.",
                a: "1NF: Atomic values only. 2NF: In 1NF and no partial dependencies (non-key columns depend on entire composite key). 3NF: In 2NF and no transitive dependencies (non-key columns depend only on primary key)."
            },
            {
                q: "What is a Foreign Key?",
                a: "A constraint that links a column in one table to the primary key of another table, ensuring referential integrity."
            }
        ]
    },
    7: {
        title: "Level 07: Programming SQL",
        subtitle: "Write PL/SQL scripts, custom functions, triggers, and exception catches.",
        topics: [
            {
                title: "Stored Procedures (प्रोसिजर)",
                query: "-- Procedure syntax block\n-- CALL update_salary(101, 5000);",
                en: "Procedures can run transactions (COMMIT/ROLLBACK) and are called using the CALL keyword.",
                mr: "स्टोर्ड प्रोसिजर्स कमिट किंवा रोलबॅक करू शकतात. त्यांना कॉल करण्यासाठी CALL कमांड वापरली जाते."
            },
            {
                title: "Database Triggers (ट्रिगर्स)",
                query: "-- Trigger fires AFTER UPDATE ON employees",
                en: "Triggers are block handlers that execute automatically when table records are modified (INSERT, UPDATE, DELETE).",
                mr: "डेटाबेसमध्ये बदल होताच आपोआप धावणारा कोड ब्लॉक (Triggers). हा बदल ऑडिट करण्यासाठी वापरतात."
            }
        ],
        qa: [
            {
                q: "What is the difference between a Stored Procedure and a Function?",
                a: "A Function must return a value and can be used inside SELECT queries. A Procedure does not need a return value and can execute transactions (COMMIT/ROLLBACK), which functions cannot do."
            },
            {
                q: "What is a Cursor?",
                a: "A pointer/cursor used to fetch and process query result rows sequentially one-by-one."
            }
        ]
    },
    8: {
        title: "Level 08: Performance Tuning",
        subtitle: "Speed up queries using indexes, execution plans, and partitions.",
        topics: [
            {
                title: "Clustered vs Non-Clustered Indexes (इंडेक्स प्रकार)",
                query: "CREATE INDEX idx_emp_salary ON employees(salary);",
                en: "Clustered indexes sort physical table rows (max 1 per table). Non-clustered indexes create separate pointer tables.",
                mr: "क्लस्टर्ड इंडेक्स टेबलमधील डेटा प्रत्यक्षपणे सॉर्ट करतो (फक्त १). नॉन-क्लस्टर्ड पत्त्यांची नवीन यादी बनवतो."
            },
            {
                title: "Query Execution Plan (EXPLAIN)",
                query: "EXPLAIN SELECT * FROM employees WHERE salary > 60000.00;",
                en: "Explains steps database engine will take. Look for Scan (Seq scan: slow) vs. Seek (Index scan: fast).",
                mr: "क्वेरी रन होण्यापूर्वी डेटाबेस तिचा आराखडा कसा आखणार आहे हे दाखवते. Seq Scan ऐवजी Index Scan असावा."
            }
        ],
        qa: [
            {
                q: "How do you optimize a query performing a full table scan (Seq Scan)?",
                a: "Create an index on the columns used in the WHERE filters or JOIN keys, and avoid leading wildcard searches (like LIKE '%name')."
            },
            {
                q: "What is Table Partitioning?",
                a: "Splitting a massive table physically into smaller ranges (e.g., by date ranges) to decrease data read scans."
            }
        ]
    },
    9: {
        title: "Level 09: Transactions & Security",
        subtitle: "Learn ACID properties, savepoints, transaction rollbacks, and permissions.",
        topics: [
            {
                title: "Transactions: COMMIT & ROLLBACK (व्यवहार नियंत्रण)",
                query: "BEGIN;\nUPDATE employees SET salary = 90000 WHERE emp_id = 101;\n-- ROLLBACK;\nCOMMIT;",
                en: "BEGIN starts transaction. COMMIT saves changes permanently. ROLLBACK reverts changes if errors occur.",
                mr: "BEGIN व्यवहार सुरू करतो. COMMIT बदल कायमचे जतन करतो. ROLLBACK एरर आल्यास सर्व बदल रद्द करतो."
            },
            {
                title: "User Permissions: GRANT & REVOKE (सुरक्षा)",
                query: "GRANT SELECT ON employees TO analyst_user;",
                en: "Allocates read-only SELECT permissions to a specific user. Use REVOKE to strip permissions.",
                mr: "विशिष्ट युझरला टेबल वाचण्याची परवानगी देते (GRANT). परवानगी काढून घेण्यासाठी REVOKE वापरतात."
            }
        ],
        qa: [
            {
                q: "Explain ACID properties.",
                a: "Atomicity (All or nothing), Consistency (Rules maintained), Isolation (Independent execution), Durability (Persistent writes surviving crashes)."
            },
            {
                q: "What is a Deadlock?",
                a: "A state where two transactions lock resources the other needs, causing both to wait indefinitely. The DB resolver aborts one."
            }
        ]
    },
    10: {
        title: "Level 10: SQL Analytics",
        subtitle: "Write SQL queries for Cohort Retention, Growth percentages, and KPIs.",
        topics: [
            {
                title: "CASE conditional logic (अटीनुसार वर्गीकरण)",
                query: "SELECT name, salary, \nCASE WHEN salary >= 70000 THEN 'High' ELSE 'Medium' END as pay_tier \nFROM employees;",
                en: "Categorizes records on the fly using if-then-else conditions inside SELECT statements.",
                mr: "सिलेक्ट क्वेरीमध्ये अटींनुसार डेटाचे वर्गीकरण करून नवीन रकान्यात वर्गवारी दाखवते."
            },
            {
                title: "Pivoting via Conditional Aggregation (पिव्होट रिपोर्ट)",
                query: "SELECT dept_id, \nSUM(CASE WHEN age < 30 THEN 1 ELSE 0 END) as young_staff, \nSUM(CASE WHEN age >= 30 THEN 1 ELSE 0 END) as senior_staff \nFROM employees GROUP BY dept_id;",
                en: "Pivots rows into custom column categorizations (sums counts based on conditional age checks).",
                mr: "उभ्या ओळींचा डेटा फिरवून आडव्या कॉलम्समध्ये विभागणी करतो आणि रिपोर्ट बनवतो."
            }
        ],
        qa: [
            {
                q: "How do you calculate Month-over-Month (MoM) revenue growth?",
                a: "Calculate monthly sales sum, use the LAG window function to pull previous month's sales, and calculate: ((Current - Previous) / Previous) * 100."
            },
            {
                q: "What is Cohort Analysis in SQL?",
                a: "Grouping users based on their sign-up month and calculating how many return to buy products in subsequent months."
            }
        ]
    }
};

// ==========================================
// 3. UI Controller State
// ==========================================
let currentLevel = 1;
let currentLanguage = 'en'; // 'en' or 'mr'
let currentTab = 'study'; // 'study' or 'qa'

// DOM Elements
const sidebarMenu = document.querySelector('.sidebar-menu');
const levelTitle = document.getElementById('level-title');
const levelSubtitle = document.getElementById('level-subtitle');
const notesContent = document.getElementById('notes-content');
const sqlEditor = document.getElementById('sql-editor');
const runQueryBtn = document.getElementById('run-query-btn');
const resetEditorBtn = document.getElementById('reset-editor-btn');
const resultsTableContainer = document.getElementById('results-table-container');
const queryStatus = document.getElementById('query-status');
const tablePreviewSelect = document.getElementById('table-preview-select');
const langBtn = document.getElementById('lang-btn');
const themeBtn = document.getElementById('theme-btn');
const tabStudy = document.getElementById('tab-study');
const tabQA = document.getElementById('tab-qa');

// ==========================================
// 4. Mock SQL Executor Engine (Simulated Parser)
// ==========================================
function executeMockSQL(sqlText) {
    // Basic sanitization
    let cleanSql = sqlText.trim().replace(/;$/, '').replace(/\n/g, ' ');
    
    // Check if it's empty
    if (!cleanSql) {
        throw new Error("Syntax Error: Query is empty.");
    }

    // Match SELECT queries
    const selectRegex = /^\s*SELECT\s+(DISTINCT\s+)?(.+?)\s+FROM\s+(\w+)(?:\s+JOIN\s+(\w+)\s+ON\s+(\w+\.\w+)\s*=\s*(\w+\.\w+))?(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+?))?(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?\s*$/i;
    const match = cleanSql.match(selectRegex);

    if (!match) {
        // Fallback for complex queries (prints a beautiful simulated result or specific instructions)
        if (cleanSql.toUpperCase().includes("EXPLAIN")) {
            return {
                headers: ["Query Plan Step", "Cost Range", "Scan Type", "Optimizations Applied"],
                rows: [
                    ["Index Scan using idx_emp_salary", "cost=0.00..8.27 rows=1 width=8", "Index Seek", "Used Index idx_emp_salary on WHERE salary filter"],
                    ["Planning Time", "0.142 ms", "N/A", "Constant Folding applied"],
                    ["Execution Time", "0.048 ms", "N/A", "Sub-millisecond query search success"]
                ]
            };
        }
        if (cleanSql.toUpperCase().includes("CASE")) {
            return {
                headers: ["name", "salary", "salary_bracket"],
                rows: [
                    ["Amit Sharma", "55000", "Tier 2 - Mid-Level"],
                    ["Pooja Patel", "70000", "Tier 2 - Mid-Level"],
                    ["Rohit Sen", "65000", "Tier 2 - Mid-Level"],
                    ["Neha Das", "80000", "Tier 1 - Executive"],
                    ["Raj Kumar", "45000", "Tier 3 - Associate"]
                ]
            };
        }
        if (cleanSql.toUpperCase().includes("DENSE_RANK")) {
            return {
                headers: ["name", "department", "salary", "dense_rank"],
                rows: [
                    ["Neha Das", "Sales", "80000", "1"],
                    ["Pooja Patel", "Sales", "70000", "2"],
                    ["Rohit Sen", "IT", "65000", "1"],
                    ["Amit Sharma", "IT", "55000", "2"],
                    ["Raj Kumar", "Marketing", "45000", "1"]
                ]
            };
        }
        throw new Error("SQL Simulator: Query parsing failed.\nOnly SELECT queries, EXPLAIN, window aggregates, or CASE expressions are supported in this sandbox.");
    }

    const isDistinct = !!match[1];
    const columnsText = match[2].trim();
    const tableName = match[3].trim().toLowerCase();
    const joinTable = match[4] ? match[4].trim().toLowerCase() : null;
    const joinKeyA = match[5];
    const joinKeyB = match[6];
    const whereClause = match[7];
    const groupByClause = match[8];
    const havingClause = match[9];
    const orderByColumn = match[10];
    const orderByDir = match[11] ? match[11].trim().toUpperCase() : 'ASC';
    const limitCount = match[12] ? parseInt(match[12], 10) : null;

    // Check if table exists in mock DB
    if (!MOCK_DB[tableName]) {
        throw new Error(`Table Not Found: Table '${tableName}' does not exist.`);
    }

    let dataset = JSON.parse(JSON.stringify(MOCK_DB[tableName]));

    // 1. Handle JOINs
    if (joinTable) {
        if (!MOCK_DB[joinTable]) {
            throw new Error(`Table Not Found: Join Table '${joinTable}' does not exist.`);
        }
        let joinedData = [];
        let secondaryData = MOCK_DB[joinTable];
        
        // Simple Inner Join logic
        dataset.forEach(rowA => {
            secondaryData.forEach(rowB => {
                // Match key values
                let keyNameA = joinKeyA.split('.')[1];
                let keyNameB = joinKeyB.split('.')[1];
                if (rowA[keyNameA] === rowB[keyNameB]) {
                    joinedData.push({ ...rowA, ...rowB });
                }
            });
        });
        dataset = joinedData;
    }

    // 2. Handle WHERE Clause (simple parser)
    if (whereClause) {
        let condition = whereClause.trim();
        dataset = dataset.filter(row => {
            // Evaluates simple comparisons like salary > 50000
            let conditionsMatch = condition.match(/(\w+)\s*([>=<!]+)\s*['"]?([\w\d\-:\.]+)['"]?/);
            if (conditionsMatch) {
                let col = conditionsMatch[1];
                let op = conditionsMatch[2];
                let val = parseFloat(conditionsMatch[3]) || conditionsMatch[3];
                let rowVal = row[col];
                
                if (typeof rowVal === 'string' && typeof val === 'number') {
                    rowVal = parseFloat(rowVal);
                }

                switch (op) {
                    case '=': return rowVal == val;
                    case '>': return rowVal > val;
                    case '<': return rowVal < val;
                    case '>=': return rowVal >= val;
                    case '<=': return rowVal <= val;
                    case '!=': return rowVal != val;
                    case '<>': return rowVal != val;
                    default: return true;
                }
            }
            return true;
        });
    }

    // 3. Handle ORDER BY
    if (orderByColumn) {
        dataset.sort((a, b) => {
            let valA = a[orderByColumn];
            let valB = b[orderByColumn];
            
            if (typeof valA === 'string') {
                return orderByDir === 'DESC' ? valB.localeCompare(valA) : valA.localeCompare(valB);
            } else {
                return orderByDir === 'DESC' ? valB - valA : valA - valB;
            }
        });
    }

    // 4. Handle SELECT Columns
    let headers = [];
    let rows = [];

    if (columnsText === '*') {
        if (dataset.length > 0) {
            headers = Object.keys(dataset[0]);
        }
    } else {
        headers = columnsText.split(',').map(c => c.trim().split(' ').pop()); // Extract aliases if present
    }

    dataset.forEach(row => {
        let selectRow = [];
        if (columnsText === '*') {
            headers.forEach(h => selectRow.push(row[h]));
        } else {
            let rawCols = columnsText.split(',').map(c => c.trim().split(/\s+as\s+/i)[0].trim());
            rawCols.forEach(col => {
                let cleanCol = col.includes('.') ? col.split('.')[1] : col;
                selectRow.push(row[cleanCol] !== undefined ? row[cleanCol] : 'NULL');
            });
        }
        rows.push(selectRow);
    });

    // 5. Handle DISTINCT
    if (isDistinct) {
        let uniqueRows = [];
        let seen = new Set();
        rows.forEach(r => {
            let key = JSON.stringify(r);
            if (!seen.has(key)) {
                seen.add(key);
                uniqueRows.push(r);
            }
        });
        rows = uniqueRows;
    }

    // 6. Handle LIMIT
    if (limitCount !== null) {
        rows = rows.slice(0, limitCount);
    }

    if (headers.length === 0) {
        headers = ["Query Output"];
        rows = [["Query returned 0 rows"]];
    }

    return { headers, rows };
}

// ==========================================
// 5. UI Controller Functions
// ==========================================
function loadLevel(levelNum) {
    currentLevel = levelNum;
    const data = COURSE_DATABASE[levelNum];
    
    // Update Title and Subtitle
    levelTitle.textContent = data.title;
    levelSubtitle.textContent = data.subtitle;

    // Load initial code snippet in editor
    if (data.topics[0] && data.topics[0].query) {
        sqlEditor.value = data.topics[0].query;
    }

    renderContent();
}

function renderContent() {
    const data = COURSE_DATABASE[currentLevel];
    notesContent.innerHTML = '';

    if (currentTab === 'study') {
        // Render Bilingual Topics
        data.topics.forEach(topic => {
            const section = document.createElement('div');
            section.className = 'topic-section';
            
            let htmlContent = `
                <h4>${topic.title}</h4>
                <div class="sql-code-block">${topic.query.replace(/\n/g, '<br>')}</div>
                <div class="explanation-row">
            `;

            if (currentLanguage === 'en' || currentLanguage === 'both') {
                htmlContent += `
                    <div class="lang-box en-box">
                        <h5>English</h5>
                        <p>${topic.en}</p>
                    </div>
                `;
            }
            if (currentLanguage === 'mr' || currentLanguage === 'both') {
                htmlContent += `
                    <div class="lang-box mr-box">
                        <h5>मराठी</h5>
                        <p>${topic.mr}</p>
                    </div>
                `;
            }

            htmlContent += `</div>`;
            section.innerHTML = htmlContent;
            
            // Allow double-click on code block to load into sandbox editor
            section.querySelector('.sql-code-block').addEventListener('click', () => {
                sqlEditor.value = topic.query;
                triggerRunQuery();
            });

            notesContent.appendChild(section);
        });
    } else {
        // Render Interview Prep Q&A
        data.qa.forEach((item, index) => {
            const qaItem = document.createElement('div');
            qaItem.className = 'qa-item';
            qaItem.innerHTML = `
                <div class="qa-question">
                    <span>Q${index+1}: ${item.q}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="qa-answer">
                    <p>${item.a}</p>
                </div>
            `;
            
            // Accordion toggle
            qaItem.querySelector('.qa-question').addEventListener('click', () => {
                const answer = qaItem.querySelector('.qa-answer');
                const icon = qaItem.querySelector('.qa-question i');
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.className = 'fa-solid fa-chevron-down';
                } else {
                    answer.style.display = 'block';
                    icon.className = 'fa-solid fa-chevron-up';
                }
            });

            notesContent.appendChild(qaItem);
        });
    }
}

function triggerRunQuery() {
    const query = sqlEditor.value;
    resultsTableContainer.innerHTML = '';
    queryStatus.className = 'status-indicator';
    
    try {
        const result = executeMockSQL(query);
        queryStatus.textContent = 'Success';
        queryStatus.classList.add('ready');

        // Create table HTML
        let tableHtml = '<table class="output-table"><thead><tr>';
        result.headers.forEach(h => {
            tableHtml += `<th>${h}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
        
        result.rows.forEach(row => {
            tableHtml += '<tr>';
            row.forEach(val => {
                tableHtml += `<td>${val}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table>';

        resultsTableContainer.innerHTML = tableHtml;

    } catch (err) {
        queryStatus.textContent = 'Error';
        queryStatus.classList.add('error');
        resultsTableContainer.innerHTML = `<div class="error-text">${err.message}</div>`;
    }
}

// ==========================================
// 6. Event Listeners Setup
// ==========================================

// Sidebar navigation click
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const levelNum = parseInt(item.getAttribute('data-level'), 10);
        loadLevel(levelNum);
    });
});

// Run Query trigger
runQueryBtn.addEventListener('click', triggerRunQuery);

// Reset editor value
resetEditorBtn.addEventListener('click', () => {
    const data = COURSE_DATABASE[currentLevel];
    if (data.topics[0]) {
        sqlEditor.value = data.topics[0].query;
    } else {
        sqlEditor.value = '';
    }
    resultsTableContainer.innerHTML = '<p class="empty-state">Run a SQL query above to see output tables here.</p>';
    queryStatus.textContent = 'Ready';
    queryStatus.className = 'status-indicator';
});

// Table selector pre-populate
tablePreviewSelect.addEventListener('change', () => {
    const tableName = tablePreviewSelect.value;
    sqlEditor.value = `SELECT * FROM ${tableName};`;
    triggerRunQuery();
});

// Language Toggle Cycle (English -> Marathi -> Side-by-side)
langBtn.addEventListener('click', () => {
    if (currentLanguage === 'en') {
        currentLanguage = 'mr';
    } else if (currentLanguage === 'mr') {
        currentLanguage = 'both';
    } else {
        currentLanguage = 'en';
    }
    renderContent();
});

// Theme Toggle
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeBtn.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
});

// Tabs trigger
tabStudy.addEventListener('click', () => {
    tabStudy.classList.add('active');
    tabQA.classList.remove('active');
    currentTab = 'study';
    renderContent();
});

tabQA.addEventListener('click', () => {
    tabQA.classList.add('active');
    tabStudy.classList.remove('active');
    currentTab = 'qa';
    renderContent();
});

// Initial startup call
loadLevel(1);
