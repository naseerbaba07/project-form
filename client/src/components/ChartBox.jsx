import React, { useEffect, useState } from "react";
import '../styles/chart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getProjects } from "../api/Api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartBox() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getProjects();
      setProjects(res.data);
    };
    load();
  }, []);

  const sectionCounts = {};

  projects.forEach((p) => {
    if (!sectionCounts[p.section]) {
      sectionCounts[p.section] = 0;
    }
    sectionCounts[p.section]++;
  });

  const chartData = {
    labels: Object.keys(sectionCounts),
    datasets: [
      {
        label: "Projects by Section",
        data: Object.values(sectionCounts),
        backgroundColor: "#3498db"
      }
    ]
  };

 return (
  <div className="chart-page">

    <div className="chart-card">

      <div className="chart-header">
        <h2>Projects by Section</h2>
        <p>Distribution of projects across sections</p>
      </div>

      <div className="chart-body">
        <Bar data={chartData} />
      </div>

    </div>

  </div>
);
}

export default ChartBox;