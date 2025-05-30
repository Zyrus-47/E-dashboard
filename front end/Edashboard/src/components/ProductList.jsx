import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  console.warn("products:", products);

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <ul className="list-header">
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
      </ul>
      {
        products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id || index} className="list-item">
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
            </ul>
          ))
        ) : (
          <p>No products found.</p>
        )
      }
    </div>
  );
};

export default ProductList;
