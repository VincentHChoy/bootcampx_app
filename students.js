const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "1234",
  host: "localhost",
  database: "bootcampx",
});
const queryString = `
SELECT students.id, students.name as students_name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool
  .query(queryString, values)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));
