import React, { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

export const DataContext = createContext({})

function DataProvider({ children }) {
  const [data, setData] = useState([])

  useEffect(() => {
    async function launchesData() {
      const oldData = localStorage.getItem("@spacexlaunches:data")
      if(oldData === null) {
      try {
        const response = await api.get("/launches")
        const history = response.data
        
        localStorage.setItem("@spacexlaunches:data", JSON.stringify(history))
        setData(history)
        
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message)
        } else {
          alert("Não foi possível obter os dados")
        }
      } 
    } else {
        const response = await api.get("/launches")
        const history = response.data
        if(oldData.results < history.results) {
          setData(history)
      }
    }
  }

    async function monthrocket() {
      try {
        const response = await api.get("/launches/stats/monthrocket")
        const history = response.data
        setData(history)
        localStorage.setItem("@spacexlaunches:monthrocket", JSON.stringify(history))
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message)
        } else {
          alert("Não foi possível obter os dados")
        }
      }
    }

    launchesData()
    monthrocket()
  }, [])

    

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

function useData() {
  return useContext(DataContext)
}

export { useData, DataProvider }
