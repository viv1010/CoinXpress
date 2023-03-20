import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CoinItem from "./Component/CoinItem";
import Navbar from "./Component/Navbar";
import ReactPaginate from "react-paginate";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setpageCount] = useState(0);
  let limit = 12;

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      )
      .then((res) => {
        console.log(res);
        const total = res.headers.get("x-total-count");
        setpageCount(Math.ceil(total / limit));
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, [limit]);

  const fetchCoins = async (currentPage) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=${currentPage}&sparkline=false`
    );
    const data = await res.json();
    return data;
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const coinsFromServer = await fetchCoins(currentPage);

    setCoins(coinsFromServer);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar handleChange={handleChange} />
      <div>
        <div className="coins-container">
          {filterCoins.map((coin) => {
            return (
              <CoinItem
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                marketCap={coin.market_cap}
                volume={coin.total_volume}
                image={coin.image}
                currentPrice={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={49}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageClassName={"page-item"}
        containerClassName={"pagination"}
        previousClassName={"page-item Previous"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
        activeClassName={"active"}
      />
    </>
  );
}

export default App;
