import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${id}`
        );
        setProduct({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
        });
      } catch (error) {
        // Toast error
        toast.error("Edit product error");
      }
    };

    getProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validations
    const errors = [];
    if (product.title.length < 3)
      errors.push("Title must contain at least 3 chars");
    if (!product.title) errors.push("There's no title");
    if (!product.description) errors.push("There's no description");
    if (!product.price) errors.push("There's no price");
    if (isNaN(product.price)) errors.push("Price must be a number");

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    const { title, description, price } = product;
    const data = { title, description, price };

    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/product/${id}`, data);
      navigate("/admin/products");
    } catch (error) {
      toast.error("Sendig form error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Form container */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-teal-900 font-bold my-2 mb-4 text-xl">
          Edit product
        </h1>
        <label>Product name</label>
        <input
          type="text"
          value={product.title}
          placeholder="Product Name"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <label>Description</label>
        <textarea
          value={product.description}
          placeholder="description"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <label>Price</label>
        <input
          type="text"
          value={product.price}
          placeholder="price"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <button className="btn-primary">Save</button>
      </form>
      {/* Toast container */}
      <ToastContainer autoClose={2500} />
    </motion.div>
  );
};

export default Edit;
