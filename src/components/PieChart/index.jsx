import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function PieChart(props) {
  const launchesData = props

  const rocketNames = {
    "5e9d0d95eda69955f709d1eb": "Falcon 1",
    "5e9d0d95eda69973a809d1ec": "Falcon 9",
    "5e9d0d95eda69974db09d1ed": "Falcon Heavy",
    "5e9d0d96eda699382d09d1ee": "Starship",
  }

  const launchesByRocket = {}

  launchesData.results.forEach((launch) => {
    const rocketName = rocketNames[launch.rocket]

    if (!launchesByRocket[rocketName]) {
      launchesByRocket[rocketName] = 0
    }

    launchesByRocket[rocketName]++
  })

  const data = {
    labels: Object.keys(launchesByRocket),
    datasets: [
      {
        label: "Numero de lançamentos",
        data: Object.values(launchesByRocket), 
        backgroundColor: [
          "rgba(0, 0, 0, 0.877)",
          "rgba(233, 146, 32, 0.877)",
          "rgba(37, 17, 214, 0.897)",
          "rgb(69, 160, 9)",
        ],
        borderColor: ["rgba(0, 0, 0, 0.575)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "left",
        align: "top",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems.map(
              (item) => `${item.label} (${item.formattedValue})`
            )
          },
        },
      },
      title: {
        display: true,
        text: "Lançamentos de Foguetes",
        font: {
          size: 26,
          weight: "bold",
        },
        color: "black",
      },
      datalabels: {
        color: "white",
        font: {
          size: 22,
        },
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
          value: null,
        },
      },
    },
  }
  
  return (<Pie 
   data={data} 
   options={options} 
   />
   
   )
}
