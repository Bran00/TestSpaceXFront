import React, { useState, useEffect } from "react"
import BarChart from "./components/BarChart"
import LaunchesResults from "./components/LaunchesResults"
import LaunchesList from "./components/LaunchesList"
import PieChart from "./components/PieChart"
import Loading from "./components/Loading"


import "./App.css"


function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      const storedData = JSON.parse(
        localStorage.getItem("@spacexlaunches:data")
      )
      if (storedData) {
        setData(storedData)
      }
    }, 1000)
  }, [])


  return data ? (
    <div className="app">
      <h1>Space X 🚀</h1>
      <div className="PieandBar">
        <div className="PieandResults">
          <div className="LaunchesResults">
            <LaunchesResults {...data} />
          </div>
          <div className="pie">
            <PieChart {...data} />
          </div>
        </div>
        <div className="BarChart">
          <div>
            <BarChart
              {...data}
              style="position: relative; height:40vh; width:100vw"
            />
          </div>
        </div>
      </div>
      <div>
        <LaunchesList {...data} />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default App
