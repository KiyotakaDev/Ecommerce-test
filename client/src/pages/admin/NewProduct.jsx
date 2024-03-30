import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: []
  })

  const createProduct = async (e) => {
    e.preventDefault();

    // Form validations
    const errors = [];
    if (product.title.length < 3) errors.push("Title must contain at least 3 chars");
    if (!product.title) errors.push("There's no title");
    if (!product.images) errors.push("At least one image");
    if (!product.description) errors.push("There's no description");
    if (!product.price) errors.push("There's no price");
    if (isNaN(product.price)) errors.push("Price must be a number");

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      // Create product query
      await axios.post("http://localhost:3000/api/products", product);
      // Query succeed
      // toast.success("Product Saved!");
      // navigate('/admin/products')
    } catch (error) {
      // Query error
      toast.error("Saving product error");
    }
  };

  const handleImageUpload = (e) => {
    // Makes array from e.target.files
    const files = Array.from(e.target.files)
    if (files.length >= 4 || product.images.length >= 4) {
      toast.error("Max 4 images")
      return;
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files]
    }))
  }

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
          value={product.title}
          placeholder="Product Name"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <label>Images (Max 4)</label>
        <div className="my-2 flex gap-4">
          {product.images.length > 0 ? (
            <>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="h-24 rounded-lg w-auto"
                />
              ))}
            </>
          ) : null}
          <label className="w-24 h-24 flex flex-col justify-center items-center text-slate-500/80 bg-slate-400/40 rounded-lg cursor-pointer">
            <ArrowUpTrayIcon className="w-10 h-10" />
            <p>Upload</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageUpload(e)}
            />
          </label>
        </div>
        <label>Description</label>
        <textarea
          value={product.description}
          placeholder="description"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
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

export default NewProduct;
