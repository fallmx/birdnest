import { useState, useEffect } from 'react'
import Violator from './components/Violator'

const App = () => {
  const [ violators, setViolators ] = useState([])

  useEffect(() => {
    const violatorSource = new EventSource('/violators')

    violatorSource.onmessage = (event) => {
      console.log(event)
      const data = JSON.parse(event.data)

      setViolators(data)
    }

    return () => {
      violatorSource.close()
    }
  }, [])

  return (
    <div>
      {violators.map((violator) => (
        <Violator key={violator.serialNumber} violator={violator} />
      ))}
    </div>
  )
}

export default App
