import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import HomePage from "./Pages/Home";
import Footer from "./Components/footer";
import { IModule } from "./Components/IModule";

function App() {
  const [solarData, setsolarData] = useState<IModule[]>([]);
  const [total, setTotal] = useState(0);

  async function fetchProducts() {
    const ApiData = await fetch("https://testtask.twnty.de");
    const response = await ApiData.json();
    const newData = Object.keys(response).map((key) => {
      return {
        ...response[key],
        name: key,
        isOpened: false,
        selectedCounter: 0,
      };
    });
    setsolarData(newData);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlerSetCount = (index: number, modifier: number) => {
    const data = solarData.map((item, itemIndex) => {
      if (
        index === itemIndex &&
        item.selectedCounter + modifier >= 0 &&
        item.selectedCounter + modifier <= item.quantity
      ) {
        return {
          ...item,
          selectedCounter: item.selectedCounter + modifier,
        };
      }
      return item;
    });
    setsolarData(data);
  };

  const handlerIsOpened = (index: number) => {
    const data = solarData.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          isOpened: !item.isOpened,
        };
      }
      return item;
    });

    setsolarData(data);
    setTotal(
      data[index].isOpened
        ? total + data[index].price * data[index].selectedCounter
        : total - data[index].price * data[index].selectedCounter
    );
  };

  function showData() {
    return solarData.map((item, index) => {
      return (
        <div className="module" key={item.name}>
          <img
            src="https://volted.ch/cdn/shop/products/priFlatDuo_Main_1800x1800.jpg?v=1667225061"
            className="module-image"
          />
          <div className="module-info">
            <span className="module-name">{item.name}</span>
            <span className="module-props">
              <span>
                <b>Avaliable:</b> {item.quantity}
              </span>
              <span>
                <b>Price:</b> {item.price + "€"}
              </span>
            </span>
            <div className="module-quantity">
              <button
                className="decrement"
                onClick={() => {
                  handlerSetCount(index, -1);
                }}
              >
                -
              </button>
              <span className="count">{item.selectedCounter}</span>
              <button
                className="implement"
                onClick={() => {
                  handlerSetCount(index, 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <button
            className={"order-button"}
            onClick={() => {
              handlerIsOpened(index);
            }}
          >
            {item.isOpened ? "Ordered ☑" : "Add to order ☐"}
          </button>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <div className="modules">{showData()}</div>
        <Footer totalAmount={total} />
      </>
    </div>
  );
}

export default App;
