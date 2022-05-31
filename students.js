const cohortName = process.argv[2];
const limit = process.argv[3];

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "1234",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
SELECT students.id, students.name as students_name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${cohortName}%'
LIMIT ${limit};
`
  )
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));