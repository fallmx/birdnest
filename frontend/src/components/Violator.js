import { useState, useEffect } from 'react'
import pilotService from '../services/pilotService'
import '../index.css'

const Violator = ({ violator }) => {
  const [ pilotInfo, setPilotInfo ] = useState({ state: 'loading' })
  const closestInMeters = Math.floor(violator.closest / 1000)

  useEffect(() => {
    // Get pilot information
    pilotService
      .getPilot(violator.serialNumber)
      .then((data) => {
        setPilotInfo({ state: 'found', data: data })
      })
      .catch(() => {
        setPilotInfo({ state: 'error' })
      })
  }, [])

  const showPilotInfo = () => {
    switch (pilotInfo.state) {
    case 'loading':
      return <p>loading pilot info...</p>
    case 'error':
      return <p className="error">Pilot info not found</p>
    case 'found':
      return renderPilotInfo()
    }
  }

  const renderPilotInfo = () => {
    const { firstName, lastName, phoneNumber, email } = pilotInfo.data

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Pilot info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{firstName} {lastName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="violator">
      <h2>{violator.serialNumber}</h2>
      <hr />
      <p>Closest distance: {closestInMeters} m</p>
      <hr />
      {showPilotInfo()}
    </div>
  )
}

export default Violator
