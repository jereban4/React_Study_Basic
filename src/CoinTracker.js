import { useState, useEffect } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);

        setLoading(false);
      });
  }, []);
  console.log("usd:", usd, "selectedCoin:", selectedCoin);

  const coinAmount =
    selectedCoin && usd ? Number(usd) / Number(selectedCoin) : 0;
  return (
    <div>
      <h1>The Coins!({coins.length})</h1>
      {loading ? <strong>Loading..</strong> : null}
      <select onChange={(e) => setSelectedCoin(e.target.value)}>
        <option value="">-- Select a coin --</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="USD"
        value={usd}
        onChange={(e) => setUsd(e.target.value)}
      ></input>
      <p>You can buy: {coinAmount.toFixed(6)} coins</p>
    </div>
  );
}

export default CoinTracker;
