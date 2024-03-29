import { BackspaceIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

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
              <tr key={product.id}>
                <td>{product.title}</td>
                <td className="flex gap-4">
                  <Link
                    to={`edit/${product.id}`}
                    className="bg-amber-400/80 px-2 py-1 rounded-lg text-base inline-flex gap-2"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                    Edit
                  </Link>
                  <Link
                    to={`product/${product.id}`}
                    className="bg-red-400/80 px-2 py-1 rounded-lg text-base inline-flex gap-2"
                  >
                    <BackspaceIcon className="w-6 h-6" />
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-2xl my-10 font-bold">
              <td>No products yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
