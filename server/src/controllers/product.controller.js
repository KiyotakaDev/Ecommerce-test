export const createProduct = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return res.status(500).json({ error: "Current error: " + error })
  }
}