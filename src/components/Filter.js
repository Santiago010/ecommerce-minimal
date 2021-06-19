import React from "react";
import "./styles/filter.css";

const Filter = ({ handleSubmit }) => {
  return (
    <form className="filter" onSubmit={(ev) => handleSubmit(ev)}>
      <div className="filter__container-inputs">
        <input type="checkbox" name="state" value="nuevo" id="state-1" />
        <label htmlFor="state-1">nuevo</label>
      </div>
      <div className="filter__container-inputs">
        <input type="checkbox" name="state" value="usado" id="state-2" />
        <label htmlFor="state-2">usado</label>
      </div>
      <div className="filter__container-inputs">
        <select name="location" id="location">
          <option value="Bogotá">Bogotá</option>
          <option value="Medellín">Medellín</option>
          <option value="Calí">Calí</option>
          <option value="Cartagena">Cartagena</option>
          <option value="Barranquilla">Barranquilla</option>
          <option value="Bucaramanga">Bucaramanga</option>
          <option value="Santa Marta">Santa Marta</option>
        </select>
        <label htmlFor="location">ubicación</label>
      </div>
      <input type="submit" className="filter__submit" value="Filtrar" />
    </form>
  );
};

export default Filter;
