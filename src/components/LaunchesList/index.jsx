import React, { useState, useEffect } from "react"
import Youtube from "../../assets/youtube.svg"
import "./launcheslist.css"

export default function LaunchesList(props) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const launchesData = props.results
  const launchesPerPage = 5

  const filteredLaunches = launchesData.filter((launch) => {
    return (
      launch.name?.toLowerCase().includes(search.toLowerCase()) ||
      (launch.success ? "Sucesso" : "Falha")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (launch.flight_number?.toString() || "").includes(search)
    )
  })

  const pageCount = Math.ceil(filteredLaunches.length / launchesPerPage)

  const displayedLaunches = filteredLaunches.slice(
    (page - 1) * launchesPerPage,
    page * launchesPerPage
  )

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage)
    }
  }

 
  const debounce = (func, delay) => {
    let timeout
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  }

  
  const delayedSearch = debounce((value) => {
    setSearch(value)
  }, 300) 

  const handleSearchChange = (e) => {
    delayedSearch(e.target.value)
  }

  return (
    <div className="LaunchesList">
      <h1>Lista de Lançamentos</h1>
      <input
        type="text"
        placeholder="Nome, Missão ou Resultado"
        value={search}
        onChange={handleSearchChange} 
      />
      <ul>
        {displayedLaunches.map((launch) => (
          <li key={launch.id}>
            <div className="launch-info">
              <h2> Nº{launch.flight_number}</h2>
              <img src={launch.links.patch.small} alt="Logo da missão" />
            </div>
            <div className="mission-info">
              <p>{launch.name}</p>
              <p>{formatDate(launch.date_utc)}</p>
            </div>
            <div className="mission-status">
              <p className={launch.success ? "green" : "red"}>
                {launch.success ? "Sucesso" : "Falha"}
              </p>
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Youtube} />
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
