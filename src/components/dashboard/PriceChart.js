"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function PriceChart({ history }) {
  const chartData = {
    labels: history
      .slice()
      .reverse()
      .map((item) => new Date(item.fetched_at).toLocaleTimeString()),

    datasets: [
      {
        label: "BTC Price",
        data: history
          .slice()
          .reverse()
          .map((item) => item.price),
      },
    ],
  };

  return <Line data={chartData} />;
}
