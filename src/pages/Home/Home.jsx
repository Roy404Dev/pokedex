import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import Card from "../../components/Card";
const Home = () => {
  let fetchData = true;
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("#");
  const [offset, setOffSet] = useState(0);
  useEffect(() => {
    const fetchCards = async () => {
      if (fetchData) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=100?id`
          );
          console.log("cause rendering");

          setCards((prevCards) => [...prevCards, ...response.data.results]);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchCards();
    return () => {
      fetchData = false;
    };
  }, [offset]);
  const filteredCards = cards
    ? cards.filter((card) => {
        if (query) {
          if (sortType === "#") {
            return card.url.split(/\//)[6] === query;
          } else {
            return card.name.toLowerCase().includes(query.toLowerCase());
          }
        }
        return cards;
      })
    : [];
  const handleLoadMore = () => {
    fetchData = true;
    setOffSet(offset + 100);
  };
  return (
    <div className="home">
      <Header
        query={query}
        setQuery={setQuery}
        setSortType={setSortType}
        sortType={sortType}
      />
      <main className="main">
        <div className="container">
          <div className="cards-container">
            {filteredCards.map((result, index) => (
              <Card
                key={index}
                name={result.name}
                id={result.url.split(/\//)[6]}
              />
            ))}
          </div>
          <div className="loadMore">
            <button className="load-more-btn" onClick={() => handleLoadMore()}>
              Load More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
