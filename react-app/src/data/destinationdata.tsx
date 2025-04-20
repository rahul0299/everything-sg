import { Link } from 'react-router'
import '../components/Destination/destination.css'
import '../components/AttractionDetailsPage/attractiondetailspage.css'

interface DestinationDataProps {
    heading: string;
    description: string;
    img_url: string;
    id: number;
}

const DestinationData = ({ heading, description, img_url, id }: DestinationDataProps) => {
    return (
      <div className='destination-grid'>
        <div className='destination-text'>
          <h2>{heading}</h2>
          <p>{description}</p>

          {/* More Details Button inside the Grid */}
          <div className='more-details-btn-container'>
            <Link to={`/attractions/${id}`}>
              <button className='more-details-btn'>More Details</button>
            </Link>
          </div>
        </div>
        <div className='destination-image'>
          <img
            alt='Beautiful destination view'
            src={img_url}
            loading='lazy'
          />
        </div>
      </div>
    )
}

export default DestinationData
