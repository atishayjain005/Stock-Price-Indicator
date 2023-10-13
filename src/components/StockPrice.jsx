import react from "react";
import "../App.css";

const StockPrice = ({ open, close, date, index, stockData }) => {
  const prevClose = index > 0 ? stockData?.data[index + 1]?.close : null;

  const isOpeningHigher = open < prevClose;
  const endOfTheDay = open > close;

  const openingPriceColor =
    open == prevClose ? "white" : isOpeningHigher ? "red" : "green";
  const closingPriceColor =
    open == close ? "white" : endOfTheDay ? "red" : "green";

  return (
    <div className="stock-price-grid">
      <p>{date.slice(0, 10).split("-").reverse().join("-")}</p>
      <p style={{ color: openingPriceColor }}>{open}</p>
      <p style={{ color: closingPriceColor }}>{close}</p>
    </div>
  );
};

export default StockPrice;
