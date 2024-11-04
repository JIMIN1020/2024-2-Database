import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// SQL SELECT 공통 함수
export const defaultQuery = async (sqlQuery: string) => {
  try {
    const [rows] = await pool.query(sqlQuery);
    return rows;
  } catch (err) {
    return false;
  }
};

export const insertQuery = async (sqlQuery: string, params: any[]) => {
  try {
    const [result] = await pool.query(sqlQuery, params);
    return result;
  } catch (err) {
    return false;
  }
};
