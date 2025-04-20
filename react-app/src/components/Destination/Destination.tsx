import './destination.css'
import data from '../../data/sample'
import DestinationData from '../../data/destinationdata'

const attractionsData = data.attractions

const Destination = () => {
  return (
    <div className='destination'>
      <h1>Popular Destinations</h1>

      {attractionsData.map((attraction, index) => (
        <DestinationData
          heading={attraction.name}
          description={attraction.description}
          img_url={attraction.img_url}
          id={attraction.id} // Pass the attraction id
          key={index}
        />
      ))}
    </div>
  )
}

export default Destination
