import { useParams } from 'react-router-dom'
import data from '../../data/sample'
import './eventdetailspage.css'

const EventDetails = () => {
  const { id } = useParams()
  const event = data.events.find((item) => item.id === id)

  if (!event) {
    return <p>Event not found!</p>
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='attraction-hero'>
        <img
          src={event.img_url}
          alt={event.name}
          className='attraction-hero-image'
        />
        <div className='hero-content'>
          <h1>{event.name}</h1>
          <button className='action-button'>
            <span>Book Now</span>
          </button>
        </div>
      </div>

      {/* Attraction Details Section */}
      <div className='attraction-details'>
        <h1>About</h1>
        <p>{event.description}</p>

        {/* Attraction Details */}
        <div className='details-section'>
          <h3>Details</h3>
          <ul>
            <li className='details-item'>
              <strong>Location:</strong> {event.details.location}
            </li>
            <li className='details-item'>
              <strong>Opening Hours:</strong> {event.details.openingHours}
            </li>
            <li className='details-item'>
              <strong>Admission:</strong> {event.details.admission}
            </li>
            <li className='details-item'>
              <strong>Cost:</strong> {event.details.cost}
            </li>
          </ul>
        </div>

        {/* Highlights */}
        <h3>Highlights</h3>
        <div className='highlights'>
          {event.details.highlights.map((highlight, index) => (
            <span key={index} className='highlight-tag'>
              {highlight}
            </span>
          ))}
        </div>

        {/* Gallery Section */}
        <h3>Gallery</h3>
        <div className='gallery'>
          {event.details.gallery.map((image, index) => (
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

export default EventDetails
