import React from "react"
import "chart.js/auto"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend)

export default function RocketLaunchesByYear(props) {
  const launches = props.results

  const rocketNames = {
    "5e9d0d95eda69955f709d1eb": "Falcon 1",
    "5e9d0d95eda69973a809d1ec": "Falcon 9",
    "5e9d0d95eda69974db09d1ed": "Falcon Heavy",
    "5e9d0d96eda699382d09d1ee": "Starship",
  }

  const launchesByYear = {}

  launches.forEach((launch) => {
    const rocketName = rocketNames[launch.rocket]
    const launchDate = new Date(launch.date_utc)
    const year = launchDate.getFullYear()

    if (!launchesByYear[year]) {
      launchesByYear[year] = {}
    }

    if (!launchesByYear[year][rocketName]) {
      launchesByYear[year][rocketName] = 0
    }

    launchesByYear[year][rocketName]++
  })

  const years = Object.keys(launchesByYear).map(String)

  const uniqueRocketNames = Array.from(new Set(Object.values(rocketNames)))

  // Cores da paleta
  const colors = [
    "rgba(0, 0, 0, 0.877)",
    "rgba(233, 146, 32, 0.877)",
    "rgba(37, 17, 214, 0.897)",
    "rgb(69, 160, 9)",
  ]

  const datasets = uniqueRocketNames.map((rocketName, index) => ({
    label: rocketName,
    data: years.map((year) => launchesByYear[year][rocketName] || 0),
    backgroundColor: colors[index % colors.length], // Use as cores da paleta
  }))

  const chartData = {
    labels: years,
    datasets,
  }

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        display: true,
      },
    },
    labels: {
      display: true,
    },
    plugins: {
      title: {
        display: true,
        text: "Lançamentos de Foguetes por Ano",
        font: {
          size: 26,
          weight: "bold",
        },
        color: "rgba(0, 0, 0, 0.877)"
      },
      datalabels: {
        display: false,
      },
      layout: {
        padding: 0, // Remova as margens
      },
    },
  }

  return <Bar data={chartData} options={options} />
}
