import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [proDuct, setProDuct] = useState([]);

  const getProDuct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProDuct(result.data.data);
  };

  async function deleteProDuct(id) {
    await axios.delete(`http://localhost:4001/products/${id}`).then(getProDuct);
  }

  useEffect(() => {
    getProDuct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {proDuct.map((item) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name:{item.name}</h1>
                <h2>Product price:{item.price} Baht</h2>
                <p>Product description:{item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  deleteProDuct(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
