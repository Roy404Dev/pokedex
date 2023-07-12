import React, { useEffect, useState } from "react";
import chevronLeft from "../../assets/icons/arrow_back.svg";
import weight from "../../assets/icons/weight.svg";
import straighten from "../../assets/icons/straighten.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Details = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState([]);
  let fetchData = true;
  let numPrefix = "0";
  if (id < 10) {
    numPrefix = "00";
  } else if (id < 100) {
    numPrefix = "0";
  } else {
    numPrefix = "";
  }

  const pokemonTypesStyles = {
    bug: "#A7B723",
    dark: "#75574C",
    dragon: "#7037FF",
    electric: "#F9CF30",
    fairy: "#E69EAC",
    fighting: "#C12239",
    fire: "#F57D31",
    flying: "#A891EC",
    ghost: "#70559B",
    normal: "#AAA67F",
    grass: "#74CB48",
    ground: "#DEC16B",
    ice: "#9AD6DF",
    poison: "#A43E9E",
    rock: "#B69E31",
    steel: "#B7B9D0",
    water: "#6493EB",
  };
  const primaryColor =
    pokemonData.types && pokemonTypesStyles[pokemonData.types[0].type.name];
  const shortNaming = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };
  useEffect(() => {
    const fetchCards = async () => {
      if (fetchData) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          console.log("cause rendering");
          setPokemonData(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchCards();
    return () => {
      fetchData = false;
    };
  }, []);
  return (
    <div className="details" style={{ backgroundColor: primaryColor }}>
      <div className="details__container">
        <header className="details__header">
          <div className="header-left">
            <Link to="/pokedex/">
              <img src={chevronLeft} alt="img" />
            </Link>
            <span className="pokemonName">{pokemonData.name}</span>
          </div>
          <div className="header-right">
            <span className="pokemonId">{`#${numPrefix}${id}`}</span>
          </div>
        </header>
        <div className="details__info">
          <img
            src={`https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt=""
            className="pokemonImage"
          />
          <div className="column">
            <div className="types">
              {pokemonData.types &&
                pokemonData.types.map((type, index) => (
                  <div
                    className="pokemonType"
                    style={{
                      backgroundColor: pokemonTypesStyles[type.type.name],
                    }}
                    key={index}
                  >
                    <span className="type-name">{type.type.name}</span>
                  </div>
                ))}
            </div>
            <div className="about">
              <span className="about-text" style={{ color: primaryColor }}>
                About
              </span>
              <div className="about-measurements">
                <div className="pokemon-weight pokemon-measurement">
                  <div className="row">
                    <img src={weight} alt="weight icon" />
                    <span>{pokemonData.weight} kg</span>
                  </div>
                  <span className="measurement-value">Weight</span>
                </div>
                <div className="pokemon-height pokemon-measurement">
                  <div className="row">
                    <img src={straighten} alt="height icon" />
                    <span>{pokemonData.height} m</span>
                  </div>
                  <span className="measurement-value">Height</span>
                </div>
                <div className="pokemon-moves pokemon-measurement">
                  <div className="col">
                    {pokemonData.abilities &&
                      pokemonData.abilities.map((ability, index) => (
                        <span className="move-name" key={index}>
                          {ability.ability.name}
                        </span>
                      ))}
                    <span className="measurement-value">Moves</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="base-stats">
              <span className="base-stats-text" style={{ color: primaryColor }}>
                Base Stats
              </span>
              <div className="stats">
                {pokemonData.stats &&
                  pokemonData.stats.map((stat, index) => (
                    <div className="pokemon-stat" key={index}>
                      <span
                        className="stat-name"
                        style={{
                          color: primaryColor,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {shortNaming[stat.stat.name]}
                      </span>
                      <span>
                        {stat.base_stat > 99
                          ? stat.base_stat
                          : `0${stat.base_stat}`}
                      </span>
                      <div className="stats-bar">
                        <div
                          className="stat-complete"
                          style={{
                            backgroundColor: primaryColor,
                            width: `${(100 * stat.base_stat) / 255}%`,
                          }}
                        ></div>
                        <div
                          className="stat-test"
                          style={{
                            backgroundColor: primaryColor,
                            opacity: 0.25,
                            width: `${100 - (100 * stat.base_stat) / 255}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
