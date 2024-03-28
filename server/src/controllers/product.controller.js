import { pool } from '../utils/database.js'

export const createProduct = async (req, res) => {
  try {
    const { title, description, price: pr } = req.body;
    const price = parseInt(pr)
    const client = await pool.connect()
    const query = `
      INSERT INTO products (title, description, price)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, description, price]
    const queryResult = await client.query(query, values);
    res.json(queryResult.rows[0])
    client.release()
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const client = await pool.connect()
    const all = await client.query("SELECT * FROM products");
    res.json(all.rows)
    client.release()
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error })
  }
}