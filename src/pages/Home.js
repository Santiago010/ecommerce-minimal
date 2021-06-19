import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/home.css";
import Modal from "../components/Modal";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Card from "../components/Card";
import image from "../images/macbookair.png";

const Home = () => {
  const [modal, setModal] = useState(false);
  let timerModal;
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: undefined,
    filter: false,
  });

  useEffect(() => {
    fetchData();

    return () => {
      setState({
        loading: false,
        error: null,
        data: undefined,
        filter: false,
      });
      clearTimeout(timerModal);
    };
  }, []);

  const fetchData = async () => {
    setState({
      loading: true,
      error: null,
    });

    try {
      const req = await fetch(
        "https://sellcars2021.herokuapp.com/api/products"
      );
      const res = await req.json();
      setState({
        loading: false,
        error: null,
        data: res.foundProducts,
      });
    } catch (error) {
      setState({
        loading: false,
        error,
      });
    }
  };

  const __openModal = () => {
    timerModal = setTimeout(() => {
      setModal(true);
    }, 200);
  };

  const __closeModal = () => {
    timerModal = setTimeout(() => {
      setModal(false);
    }, 200);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const dataFilter = new FormData(ev.target);
    FilterData(dataFilter);
    __closeModal();
  };

  const FilterData = (dataFilter) => {
    setState({
      loading: true,
      data: null,
      error: null,
    });
    const listProductsFilteredByState = state.data.filter(
      (product) => product.estado === dataFilter.get("state")
    );

    const listProductsFilteredByLocation = listProductsFilteredByState.filter(
      (product) => product.ubicación === dataFilter.get("location")
    );

    setState({
      loading: false,
      data: listProductsFilteredByLocation,
      error: null,
      filter: true,
    });
  };

  return (
    <React.Fragment>
      <div className="filter_products" onClick={() => __openModal()}>
        <i className="fas fa-filter"></i>
      </div>
      {modal && (
        <Modal onClose={() => __closeModal()}>
          <Filter handleSubmit={handleSubmit} />
        </Modal>
      )}
      <div className="Home">
        <div className="Home__slider">
          <div className="slider__info">
            <h1>Macbook Air M1</h1>
            <p>
              El chip M1 de Apple redefine el portátil más fino y ligero. La CPU
              es hasta 3,5 veces más potente. Los gráficos, hasta cinco veces
              más rápidos.
            </p>
            <Link to="detail/60a73472ed57770fca13d1fc">Saber Mas</Link>
          </div>
          <div className="slider__product">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="Home__list">
          <div className="list__title">
            <h1>Productos</h1>
            {state.filter && (
              <div onClick={() => fetchData()}>Limpiar Filtro</div>
            )}
          </div>
          {state.loading ? (
            <Loader />
          ) : (
            state.data.map((product, index) => (
              <Card product={product} key={index} index={index} />
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
