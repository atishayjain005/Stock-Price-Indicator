import { useEffect, useState } from "react";

import StockPrice from "./components/StockPrice";
import Pagination from "./components/Pagination";
import Chart from "./components/Chart";

import "./App.css";

function App() {
  const [stockData, setStockData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 7;

  const totalPages = Math.ceil((stockData?.data?.length || 0) / itemsPerPage);

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const PriceCard = ({ unit, index }) => {
    const fluctuation =
      stockData &&
      paginateData(stockData.data)?.sort((a, b) => a?.[unit] - b?.[unit])[
        index
      ]?.[unit];

    return fluctuation;
  };

  const handleFetchData = async () => {
    const response = await fetch(
      "https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data/",
    );
    const data = await response.json();
    setStockData(data);
  };

  useEffect(() => {
    handleFetchData();
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="app-container">
      <h2 className="title">
        Stock Price of AAPL for the span of 21 days ( 7 per page )
      </h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="app-wrapper">
          <div className="stock-grid-wrapper">
            <h2 className="stock-symbol">{stockData.data[0].symbol}</h2>
            <div className="stock-price-grid">
              <p>Date</p>
              <p>Open</p>
              <p>Close</p>
            </div>
            {stockData &&
              paginateData(stockData.data).map((val, i) => {
                const absoluteIndex = (currentPage - 1) * itemsPerPage + i;
                return (
                  <div key={i}>
                    <StockPrice
                      open={val.open}
                      close={val.close}
                      date={val.date}
                      index={absoluteIndex}
                      stockData={stockData}
                    />
                  </div>
                );
              })}
            <Pagination
              stockData={stockData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
          <div>
            <div className="chart-wrapper">
              <Chart stockData={stockData && paginateData(stockData.data)} />
            </div>
            <div className="price-cards">
              <div className="card">
                <h2 className="high">
                  <PriceCard unit="high" index={itemsPerPage - 1} />
                </h2>
                <blockquote>7 day high</blockquote>
              </div>
              <div className="card">
                <h2 className="low">
                  <PriceCard unit="low" index={0} />
                </h2>
                <blockquote>7 day low</blockquote>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
