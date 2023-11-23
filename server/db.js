import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { PG_HOST, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

const prodPool = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
};
const devPool = {
  host: PG_HOST,
  port: PG_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
};

const pool = new pg.Pool(
  process.env.NODE_ENV === "production" ? prodPool : devPool
);

const executeQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error(error.stack);
    error.name = "Database error";
    throw error;
  } finally {
    client.release();
  }
};

export const createUsersTable = async () => {
  const admin = {
    id: process.env.ADMIN_ID,
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: process.env.ADMIN_ROLE,
  };
  const query = `
        CREATE TABLE IF NOT EXISTS "users" (
    "id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(15) NULL,
    PRIMARY KEY (id)
        )`;
  await executeQuery(query);
  // console.log("Users table initialized");
  const insertAdmin = `INSERT INTO users (id, username, email, password, role) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING;`;
  await executeQuery(insertAdmin, [
    admin.id,
    admin.username,
    admin.email,
    admin.password,
    admin.role,
  ]);
  // console.log("admin initialized");
};

export default executeQuery;
