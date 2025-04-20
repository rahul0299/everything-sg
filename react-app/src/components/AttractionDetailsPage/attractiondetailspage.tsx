import { useParams } from 'react-router-dom'
import data from '../../data/sample'
import './attractiondetailspage.css'

const AttractionDetails = () => {
  const { id } = useParams()
  const attraction = data.attractions.find((item) => item.id === id)

  if (!attraction) {
    return <p>Attraction not found!</p>
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='attraction-hero'>
        <img
          src={attraction.img_url}
          alt={attraction.name}
          className='attraction-hero-image'
        />
        <div className='hero-content'>
          <h1>{attraction.name}</h1>
          <button className='action-button'>
            <span>Book Now</span>
          </button>
        </div>
      </div>

      {/* Attraction Details Section */}
      <div className='attraction-details'>
        <h1>About</h1>
        <p>{attraction.description}</p>

        {/* Attraction Details */}
        <div className='details-section'>
          <h3>Details</h3>
          <ul>
            <li className='details-item'>
              <strong>Location:</strong> {attraction.details.location}
            </li>
            <li className='details-item'>
              <strong>Opening Hours:</strong> {attraction.details.openingHours}
            </li>
            <li className='details-item'>
              <strong>Admission:</strong> {attraction.details.admission}
            </li>
            <li className='details-item'>
              <strong>Cost:</strong> {attraction.details.cost}
            </li>
          </ul>
        </div>

        {/* Highlights */}
        <h3>Highlights</h3>
        <div className='highlights'>
          {attraction.details.highlights.map((highlight, index) => (
            <span key={index} className='highlight-tag'>
              {highlight}
            </span>
          ))}
        </div>

        {/* Gallery Section */}
        <h3>Gallery</h3>
        <div className='gallery'>
          {attraction.details.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className='gallery-image'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AttractionDetails
