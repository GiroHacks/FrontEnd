import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      }
    }
  };


const skills = [
    {"label":"React.js","value":100000},
    {"label":"Vue","value":85000},
    {"label":"Angular","value":75000},
    {"label":"C++","value":30000},
    {"label":"Python","value":50000},
];
const labels = skills.map(s=>s.label)
  
export const data = {
    labels,
    datasets: [{
        label: "Valuable skills",
        data: skills.map(s => s.value),
        backgroundColor: "rgba(53, 162, 235, 0.5)"
    }]
};

export default function BarChart(){
    return(
        <div style={{width:"80%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div style={{width:"60%"}}>
                <Bar options={options} data={data} />;
            </div>
        </div>
        
    ) 
    
}