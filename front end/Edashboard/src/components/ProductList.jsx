import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const deleteProduct = async (id) => {
  let result = await fetch(`http://localhost:5000/product/${id}`, {
    method: "DELETE"
  });

  result = await result.json();

  if (result) {
    getProducts();
  }
};

const searchHandle=async (event)=>{
  let key =event.target.value;
  if(key){
    let result = await fetch(`http://localhost:5000/search/${key}`);
  result= await result.json();
  if(result){
    setProducts(result)
  }
  }else{
    getProducts();
  }
  
}


  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input type="text" placeholder="Search Product" className="search-product-box"
      onChange={searchHandle}
      />
      <ul className="list-header">
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id || index} className="list-item">
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>
                <button onClick={()=>deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/"+item._id}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No products found.</h1>
        )
      }
    </div>
  );
};

export default ProductList;
