import './event.css'
import data from '../../data/sample'
import EventData from '../../data/eventdata'
const eventdata = data.events

const Event = () => {
  return (
    <div className='destination'>
      <h1>Popular Destinations</h1>

      {eventdata.map((event, index) => (
        <EventData
          heading={event.name}
          description={event.description}
          img_url={event.img_url}
          key={index}
        />
      ))}
    </div>
  )
}

export default Event

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
