import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataInput, setDataInput] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result);
    setDataInput(result.data.data);
  };

  const removeData = (dataId) => {
    axios.delete("http://localhost:4001/products/" + dataId).then(getData);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {dataInput.map((data) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={data.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {data.name}</h1>
                <h2>Product price: {data.price} Baht</h2>
                <p>Product description: {data.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  removeData(data.id);
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
