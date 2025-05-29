import React from "react";

const AddProduct = () => {
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const addProduct = async () => {
    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input type="text" placeholder="enter product name" className="inputBox"
      value={name}  onChange={(e)=>{setName(e.target.value)}}
      />

      <input type="text" placeholder="enter product price"className="inputBox"
      value={price}   onChange={(e)=>{setPrice(e.target.value)}}/>
      <input type="text" placeholder="enter product category"className="inputBox"
      value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
      <input type="text" placeholder="enter product company"className="inputBox"
      value={company}  onChange={(e)=>{setCompany(e.target.value)}}/>
      <button onClick={addProduct}  className="appbutton">Add Product</button>
    </div>
  );
};

export default AddProduct;
