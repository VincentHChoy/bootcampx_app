const cohortName = process.argv[2];

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
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN assignments ON assignments.id = assignment_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${cohortName}'
ORDER BY teachers.name;
`
  )
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));
