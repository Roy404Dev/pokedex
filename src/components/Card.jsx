import React from "react";
import { Link } from "react-router-dom";
const Card = ({ name, id }) => {
  let numPrefix = "0";
  if (id < 10) {
    numPrefix = "00";
  } else if (id < 100) {
    numPrefix = "0";
  } else {
    numPrefix = "";
  }
  const imgURL =
    "https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/other/official-artwork/";
  return (
    <Link to={"/pokedex/pokemon/" + id} style={{ textDecoration: 'none' }}>
      <div className="pokemonCard" >
        <div className="card-top">
          <div className="pokemon-id">
            <span>{`#${numPrefix}${id}`}</span>
          </div>
          <img
            src={imgURL + id + ".png"}
            alt="pokemon image"
            className="pokemon-image"
          />
        </div>
        <div className="card-bottom">
          <span className="pokemon-name">{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
