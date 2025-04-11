import { Component, ReactNode } from 'react'
import '../components/Destination/destination.css'

class DestinationData extends Component {
  render(): ReactNode {
    return (
      <div className='destination-grid'>
        <div className='destination-text'>
          <h2>{this.props.heading}</h2>
          <p>{this.props.description}</p>
        </div>
        <div className='destination-image'>
          <img
            alt='Beautiful destination view' // More descriptive alt text
            src={this.props.img_url}
            loading='lazy' // Better performance
          />
        </div>
      </div>
    )
  }
}
export default DestinationData
