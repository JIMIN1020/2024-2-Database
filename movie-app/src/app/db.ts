import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// SQL 공통 함수
export const query = async (sqlQuery: string) => {
  try {
    const [rows] = await pool.query(sqlQuery);
    return rows;
  } catch (err) {
    console.log(err);
    return false;
  }
};
