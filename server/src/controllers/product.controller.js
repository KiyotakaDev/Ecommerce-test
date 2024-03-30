import { pool } from "../utils/database.js";

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const client = await pool.connect();
    const all = await client.query("SELECT * FROM products ORDER BY id");
    res.json(all.rows);
    client.release();
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const queryResult = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (queryResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(queryResult.rows[0]);
    client.release();
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price: pric } = req.body;
    const price = parseInt(pric);
    const client = await pool.connect();
    const query = `
        UPDATE products
        SET title = $1, description = $2, price = $3
        WHERE id = $4
        RETURNING *;
     `;
    const values = [title, description, price, id];
    const queryResult = await client.query(query, values);

    if (queryResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(queryResult.rows[0]);
    client.release();
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const client = await pool.connect()
    await client.query("DELETE FROM products WHERE id = $1", [id])
    res.json("Product deleted!")
    client.release()
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error })
  }
}
