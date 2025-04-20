import './event.css'
import EventData from '../../data/eventdata'
import {CategoryData} from "../../types/store.tsx";
import {getImgUrl} from "../../utlis.ts";


const Event = ({ events }: {events: CategoryData[]}) => {
  return (
    <div className='destination'>
      <h1>Popular Destinations</h1>

      {events.map((event, index) => (
        <EventData
          heading={event.name}
          description={event.description}
          img_url={getImgUrl(event.name, event.images[0])}
          id={event.id} // Pass the attraction id
          key={index}
        />
      ))}
    </div>
  )
}

export default Event
