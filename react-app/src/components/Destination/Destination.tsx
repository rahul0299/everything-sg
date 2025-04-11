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
          key={index}
        />
      ))}
    </div>
  )
}

export default Destination

{
  /*
      <div className='destination-grid'>
        <div className='destination-text'>
          <h2>Destination Name</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </p>
        </div>
        <div className='destination-image'>
          <img
            alt='Beautiful destination view'
            src='https://images.unsplash.com/photo-1645275168620-7a35326deb25'
            loading='lazy'
          />
        </div>
      </div>
      */
}
