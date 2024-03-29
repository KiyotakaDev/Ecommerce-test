import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const createProduct = async (e) => {
    e.preventDefault();

    // Form validations
    const errors = [];
    if (title.length < 3) errors.push("Title must contain at least 3 chars");
    if (!title) errors.push("There's no title");
    if (!images) errors.push("At least one image");
    if (!images.length > 4) errors.push("Max 4 images")
    if (!description) errors.push("There's no description");
    if (!price) errors.push("There's no price");
    if (isNaN(price)) errors.push("Price must be a number");

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.forEach((image, index) => {
      formData.append(`image-${index + 1}`, image);
    });

    try {
      // Create product query
      await axios.post("http://localhost:3000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length >= 4 || images.length >= 4) {
      toast.error("Max 4 images");
      return;
    }
    setImages(prevFiles => [...prevFiles, ...files]);
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
        <label>Images (Max 4)</label>
        <div className="my-2 flex gap-4">
          {images.length > 0 ? (
            <>
              {images.map((img) => (
                <img
                  key={img.name}
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
