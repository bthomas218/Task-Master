import { pool } from "../db/pool.js";

/**
 * Middleware to get a database client from the connection pool.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 * @returns {Promise<void>}
 */
const getClient = async (req, res, next) => {
  try {
    const client = await pool.connect();
    req.db = client;

    res.on("finish", () => client.release());

    next();
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    res.status(500).json({ Error: `Database connection error` });
  }
};

export default getClient;
