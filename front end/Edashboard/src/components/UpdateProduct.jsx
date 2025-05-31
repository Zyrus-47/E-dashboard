import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate =useNavigate();

  
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
  console.warn(name, price, category, company);
  
  let result = await fetch(`http://localhost:5000/product/${params.id}`, {
    method: "PUT",
    body: JSON.stringify({ name, price, category, company }),
    headers: {
      "Content-Type": "application/json", 
    },
  });

  result = await result.json();
  console.warn(result);
  navigate('/')
};


  return (
    <div className="product">
      <h1>Update Product</h1>

      <input
        type="text"
        placeholder="enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={updateProduct} className="appbutton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
