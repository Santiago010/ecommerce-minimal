import React from "react";
import Card from "../components/Card";
import "./style/ShoppingCart.css";

const ShoppingCart = () => {
  if (localStorage.getItem("listProducts") === "") {
    return (
      <div className="Shopping-cart">
        <h1 className="shopping-cart__title">
          No has agregado ningun producto
        </h1>
      </div>
    );
  } else {
    return (
      <div className="shopping-cart">
        <h1 className="shopping-cart__title">Lista de Productos Añadidos</h1>
        {JSON.parse(localStorage.getItem("listProducts")).map(
          (product, index) => (
            <Card product={product} key={index} />
          )
        )}
      </div>
    );
  }
};

export default ShoppingCart;
