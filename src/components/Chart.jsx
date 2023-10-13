import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The folloiwing chart represents the opening and closing prices of AAPL for 7 days ",
    },
  },
};

export default function Chart({ stockData }) {
  const labels =
    stockData &&
    stockData
      ?.map((val) => val.date.slice(0, 10).split("-").reverse().join("-"))
      .reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Opening",
        data: stockData && stockData?.map((val) => val.open).reverse(),
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Closing",
        data: stockData && stockData?.map((val) => val.close).reverse(),
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
