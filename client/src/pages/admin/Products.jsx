import { BackspaceIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("Fetching products error: " + error);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (productID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/product/${productID}`
      );
      toast.success(response.data);
      setProducts(products.filter((product) => product.id !== productID));
    } catch (error) {
      console.log("Deleting product error: " + error);
    }
  };

  const handleDeleteClick = (id) => {
    setShowModal(true);
    setDeleting(id);
  };
  const handleConfirm = () => {
    deleteProduct(deleting);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
    setDeleting(null);
  };

  return (
    <div>
      <Link
        to={"new"}
        className="bg-emerald-500 text-xl text-white rounded-md py-1 px-2"
      >
        Add new product
      </Link>
      <table className="tb w-full mt-8">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <td>{product.title}</td>
                <td className="flex gap-4">
                  <Link
                    to={`edit/${product.id}`}
                    className="bg-amber-400/80 px-2 py-1 rounded-lg text-base inline-flex gap-2"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="bg-red-400/80 px-2 py-1 rounded-lg text-base inline-flex gap-2"
                  >
                    <BackspaceIcon className="w-6 h-6" />
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr className="text-2xl my-10 font-bold">
              <td>No products yet</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-md"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <p className="mb-4">
                Are you sure you want to delete this product?
              </p>
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                No
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Products;
