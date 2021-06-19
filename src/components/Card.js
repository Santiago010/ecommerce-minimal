import React from "react";
import { Link } from "react-router-dom";
import "./styles/Card.css";

const Card = ({ product, index }) => {
  return (
    <div className="list__product" key={product._id}>
      <div className="product__container">
        <div className="container__image">
          <img
            src={`https://sellcars2021.herokuapp.com/${product.images[0]}`}
            alt=""
          />
        </div>
        <div className="container__info">
          <b>{product.valor}</b> <em>{product.estado}</em>
        </div>
        <p className="container__description">{product.descripción}</p>
        <Link to={`/detail/${product._id}`} className="container__link">
          <i className="fas fa-eye"></i>
        </Link>
      </div>
    </div>
  );
};

export default Card;
