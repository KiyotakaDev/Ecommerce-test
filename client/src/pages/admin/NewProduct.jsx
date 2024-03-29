import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();

    // Form validations
    const errors = [];
    if (title.length < 3) errors.push("Title must contain at least 3 chars");
    if (!title) errors.push("There's no title");
    if (!description) errors.push("There's no description");
    if (!price) errors.push("There's no price");
    if (isNaN(price)) errors.push("Price must be a number");

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    const data = { title, description, price };
    try {
      // Create product query
      await axios.post("http://localhost:3000/api/products", data);
      // Toast succeed
      toast.success("Product Saved!");
      setTitle("");
      setDescription("");
      setPrice("");
    } catch (error) {
      // Toast error
      toast.error("Saving product error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Form container */}
      <form onSubmit={(e) => createProduct(e)}>
        <h1 className="text-teal-900 font-bold my-2 mb-4 text-xl">
          New product
        </h1>
        <label>Product name</label>
        <input
          type="text"
          value={title}
          placeholder="Product Name"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn-primary">Save</button>
      </form>
      {/* Toast container */}
      <ToastContainer autoClose={2500} />
    </motion.div>
  );
};

export default NewProduct;
