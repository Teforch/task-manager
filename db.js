import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task_manager",
  password: "3201",
  port: 5432,
});

export default pool;
