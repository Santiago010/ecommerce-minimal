import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/Detail.css";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const Detail = (props) => {
  const [modal, setModal] = useState(false);
  let timerModal;

  const [state, setState] = useState({
    loading: true,
    error: null,
    data: undefined,
  });
  const [PositionImage, setPositionImage] = useState(0);

  useEffect(() => {
    fetchData();

    return () => {
      setState({
        loading: false,
        error: null,
        data: undefined,
      });
      clearTimeout(timerModal);
    };
  }, []);

  const changeImages = () => {
    if (PositionImage === 2) {
      setPositionImage(0);
    } else {
      setPositionImage(PositionImage + 1);
    }
  };

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

      let dataProduct = await res.foundProducts.filter(
        (product) => product._id === props.match.params.idProduct
      );

      setState({
        loading: false,
        error: null,
        data: dataProduct[0],
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

  return (
    <div className="Container__Detail">
      {state.loading ? (
        <Loader />
      ) : (
        <div className="Detail">
          {modal && (
            <Modal onClose={() => __closeModal()}>
              {localStorage.getItem("token") === null ? (
                <div className="Detail__confimation">
                  <p>
                    Debes ingresar a tu cuenta para poder añadir productos al
                    carrito
                  </p>
                  <Link to="/login">Iniciar sesión</Link>
                </div>
              ) : (
                <div className="Detail__confimation">
                  <p>Quieres añadir al carrito?</p>
                  <button
                    onClick={() => {
                      if (localStorage.getItem("listProducts").length === 0) {
                        const ArrayProducts = new Array();
                        localStorage.setItem(
                          "listProducts",
                          JSON.stringify(ArrayProducts)
                        );
                      }
                      const listProducts = localStorage.getItem("listProducts");
                      let dataListProducts = JSON.parse(listProducts);
                      dataListProducts.push(state.data);
                      let dataParse = JSON.stringify(dataListProducts);
                      localStorage.setItem("listProducts", dataParse);
                      __closeModal();
                    }}
                  >
                    SI
                  </button>
                </div>
              )}
            </Modal>
          )}
          <div className="Detail__box-images">
            <div className="box-images__images">
              <img
                src={`https://sellcars2021.herokuapp.com/${state.data.images[PositionImage]}`}
                alt=""
              />
            </div>
            <div onClick={() => changeImages()} className="box-images__changer">
              <i className="fas fa-plus"></i>
              {PositionImage + 1} Siguiente Imagen
            </div>
          </div>
          <div className="Detail__box-info">
            <div className="box-info__description">
              <p>{state.data.descripción}</p>
            </div>
            <ul className="box-info__list-info">
              <li>Valor : {state.data.valor}</li>
              <li>Estado : {state.data.estado}</li>
              <li>Ciudad : {state.data.ubicación}</li>
              <li>Contacto : {state.data.datos_contacto}</li>
            </ul>
            <div className="box-info__add-card">
              <div className="add-card__button" onClick={() => __openModal()}>
                <i className="fas fa-cart-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
