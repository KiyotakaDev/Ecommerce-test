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
    client.release()
    return res.status(204).json({ product: queryResult.rows[0] })
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error })
  }
}