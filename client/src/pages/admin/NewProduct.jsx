import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    try {
      // Create product query
      await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
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
    <>
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
    </>
  )
}

export default NewProduct