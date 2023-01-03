const Violator = ({ violator }) => {
  const closestInMeters = Math.floor(violator.closest / 1000)

  return (
    <div>
      <h2>{violator.serialNumber}</h2>
      <p>Closest distance: {closestInMeters} m</p>
    </div>
  )
}

export default Violator
