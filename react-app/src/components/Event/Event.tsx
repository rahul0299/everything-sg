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
          id={event.id} // Pass the attraction id
          key={index}
        />
      ))}
    </div>
  )
}

export default Event
