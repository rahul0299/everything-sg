import { useParams } from 'react-router'
import './eventdetailspage.css'
import {useEffect, useState} from "react";
import {API} from "../../config.ts";
import {CategoryData} from "../../types/store.tsx";
import {getImgUrl} from "../../utlis.ts";

const EventDetails = () => {
  const { id } = useParams()

  const [event, setEvent] = useState<CategoryData | null>(null)

  useEffect(() => {
    // setIsLoading(true);
    fetch(`${API.EVENTS}${id}`, { signal: AbortSignal.timeout(1000) })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to fetch movie");
          }
        })
        .then(data => setEvent(data))
        .catch((err) => {
          console.error(err);
        })
        // .finally(() => setIsLoading(false));
  }, [id]);

  console.log(event);


  if (!event) {
    return <p>Event not found!</p>
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='attraction-hero'>
        <img
          src={getImgUrl(event.name, event.images[0])}
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
              <strong>Location:</strong> {event.location}
            </li>
            <li className='details-item'>
              <strong>Opening Hours:</strong> {event.operating_hours}
            </li>
            <li className='details-item'>
              <strong>Cost:</strong> {event.price} SGD
            </li>
          </ul>
        </div>

        {/* Highlights */}
        <h3>Highlights</h3>
        <div className='highlights'>
          {event.tags.map((highlight, index) => (
            <span key={index} className='highlight-tag'>
              {highlight}
            </span>
          ))}
        </div>

        {/* Gallery Section */}
        <h3>Gallery</h3>
        <div className='gallery'>
          {event.images.map((image, index) => (
            <img
              key={index}
              src={getImgUrl(event.name, image)}
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
