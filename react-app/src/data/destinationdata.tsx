import { Component, ReactNode } from 'react'
import { Link } from 'react-router'
import '../components/Destination/destination.css'
import '../components/AttractionDetailsPage/attractiondetailspage.css'
class DestinationData extends Component {
  render(): ReactNode {
    return (
      <div className='destination-grid'>
        <div className='destination-text'>
          <h2>{this.props.heading}</h2>
          <p>{this.props.description}</p>

          {/* More Details Button inside the Grid */}
          <div className='more-details-btn-container'>
            <Link to={`/attraction/${this.props.id}`}>
              <button className='more-details-btn'>More Details</button>
            </Link>
          </div>
        </div>
        <div className='destination-image'>
          <img
            alt='Beautiful destination view'
            src={this.props.img_url}
            loading='lazy'
          />
        </div>
      </div>
    )
  }
}

export default DestinationData
