import './destination.css'
import DestinationData from '../../data/destinationdata'
import {CategoryData} from "../../types/store.tsx";
import {getImgUrl} from "../../utlis.ts";



const Destination = ({ destinations }: { destinations: CategoryData[] }) => {
  return (
    <div className='destination'>
      <h1>Popular Destinations</h1>

      {destinations.map((attraction, index) => (
        <DestinationData
          heading={attraction.name}
          description={attraction.description}
          img_url={getImgUrl(attraction.name, attraction.images[0])}
          id={attraction.id} // Pass the attraction id
          key={index}
        />
      ))}
    </div>
  )
}

export default Destination
