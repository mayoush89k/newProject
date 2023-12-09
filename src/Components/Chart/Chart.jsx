import * as React from "react";
import "./Chart.css";
// import { BarChart } from "@mui/x-charts";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useCharacter } from "../../context/CharactersContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function Chart() {
    const {characters} = useCharacter()
  const option = {
    elements:{
        bar:{
          borderWidth:-5,
        }
      },
      scales:{
        x:{
          stacked:true
        },
        y:{
          stacked:true
        }
      },
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Friends Votes Bar Chart",
      },
    },
  };
const sortedByVotes = characters.sort((char1, char2) => char1.votes - char2.votes)
  const data = {
    labels: sortedByVotes.map(char => char.name),
    datasets: [
      {
        label: "Product A",
        data: sortedByVotes.map(char => char.votes),
        backgroundColor: "green",
      },
      {
        label: "Product B",
        data: sortedByVotes.map(char => char.votes),
        backgroundColor: "blue",
      },
    ],
  };
  return (
    <div className="App">
      <Bar options={option} data={data} />
    </div>
  );
}
