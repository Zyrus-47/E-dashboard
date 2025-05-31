import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("User not found. Please login again.");
      return;
    }

    const userId = user._id;

    try {
      const result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      const data = await result.json();
      console.warn("Product added:", data);
      // Optional: Clear form after adding product
      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
      setError(false);
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Something went wrong while adding the product.");
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="invalid-input">Enter valid price</span>}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span className="invalid-input">Enter valid category</span>}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span className="invalid-input">Enter valid company</span>}

      <button onClick={addProduct} className="appbutton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
