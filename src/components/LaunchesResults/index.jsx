import "./launchesresults.css"

export default function LaunchesResults(props) {
  const launchesData = props

  let successCount = 0
  let failureCount = 0

  launchesData.results.map((launch) => {
    if (launch.success) {
      successCount++
    } else {
      failureCount++
    }
  })

  return (
    <div className="LaunchesresultsComponent">
      <p>
        <strong>Resultado por lançamento:</strong>
      </p>
      <p>
        Sucesso: <span>{successCount}</span>
      </p>
      <p>
        Falha: <span>{failureCount}</span>
      </p>
    </div>
  )
}
